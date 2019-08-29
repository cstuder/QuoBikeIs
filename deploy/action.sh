#!/usr/bin/env bash

set -x
set -e
export LC_ALL=C.UTF-8

###
#
# Deployment action
#
# Uses secret SSH_PRIVATE_KEY and APPRISE_URL
#
# @author Christian Studer <cstuder@existenz.ch>
#
##

## Configuration
DEST_LIVE="existenz@existenz.ch:~/www/existenz_quobikeis/"
DEST_TEST="existenz@existenz.ch:~/www/existenz_quobikeis-TEST/"
SRC_PATH="$GITHUB_WORKSPACE/build/";
SRC_SERVICE_PATH="$GITHUB_WORKSPACE/service/";

ENV_FILE="$GITHUB_WORKSPACE/.env.local"
LOCALAPI_LIVE="https://quobikeis.existenz.ch/service/"
LOCALAPI_TEST="https://quobikeis-test.existenz.ch/service"

NOTIFICATION_TITLE="quobikeis {{ ref }} deployed"
NOTIFICATION_BODY="Commit by {{ head_commit.author.name }}: {{ head_commit.message | truncate(128) }} ({{ head_commit.id[0:7] }})"
NOTIFICATION_URL="$APPRISE_URL"

## Installation
sudo apt-get -y install python3-pip jq rsync ssh python3-setuptools
sudo pip3 install apprise j2cli

## Detect branch
REF=$(cat $GITHUB_EVENT_PATH | jq '.ref')
if [[ "$REF" =~ \/([^\/]*)\"$ ]]; then
  BRANCH="${BASH_REMATCH[1]}"
  echo "Branch detected: $BRANCH"
  NOTIFICATION_TITLE="quobikeis $BRANCH deployed"
else
  echo "No branch found in ref: $REF"
  exit 1
fi

## Determine destination
case $BRANCH in
  LIVE)
    DEST=$DEST_LIVE
    LOCALAPI=$LOCALAPI_LIVE
    echo "Deploying to production environment: $DEST"
    ;;

  TEST)
    DEST=$DEST_TEST
    LOCALAPI=$LOCALAPI_TEST
    echo "Deploying to testing environment: $DEST"
    ;;
  
  *)
    echo "Not a deployment branch, no deployment."
    exit 0
    ;;
esac

## Build
echo "REACT_APP_LOCALAPI=$LOCALAPI" > $ENV_FILE;

npm install
npm run build

## Deploy

# Get SSH_PRIVATE_KEY from secrets
SSH_PATH="$HOME/.ssh"
mkdir "$SSH_PATH"
echo "$SSH_PRIVATE_KEY" > "$SSH_PATH/id_rsa"
chmod 600 "$SSH_PATH/id_rsa"

# Execute rsync
rsync --progress --verbose --archive -e 'ssh -o StrictHostKeyChecking=no -i '"$SSH_PATH"'/id_rsa' $SRC_PATH $DEST
rsync --progress --verbose --archive -e 'ssh -o StrictHostKeyChecking=no -i '"$SSH_PATH"'/id_rsa' $SRC_SERVICE_PATH "$DEST/service"

## Notify

# Save title and message to temporary files
titlefile=$(mktemp)
messagefile=$(mktemp)

echo $NOTIFICATION_TITLE > $titlefile
echo $NOTIFICATION_BODY > $messagefile

# Apply templating with data from the GitHub event
title=$(j2 $titlefile $GITHUB_EVENT_PATH)
message=$(j2 $messagefile $GITHUB_EVENT_PATH)

# Uses the Apprise CLI tool
echo "Notification title: $title"
echo "Notification message: $message"

apprise -t "$title" -b "$message" "$NOTIFICATION_URL"
