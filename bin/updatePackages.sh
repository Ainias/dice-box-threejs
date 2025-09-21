#!/bin/bash
set -e

PROJECTS=(
"/Users/sguenter/Projekte/Privat/dnd"
)

npm run build

TMP_PATH=$(mktemp -d 2>/dev/null || mktemp -d -t 'mytmpdir')
PACK_OUTPUT=( $(npm pack) );

PACK_NAME=${PACK_OUTPUT[${#PACK_OUTPUT[@]}-1]};
echo $PACK_NAME

tar -xvzf $PACK_NAME -C $TMP_PATH --strip-components=1
rm $PACK_NAME;

for PROJECT in "${PROJECTS[@]}"; do
  mkdir -p $PROJECT/node_modules/@3d-dice/dice-box-threejs
  cp -rf $TMP_PATH/. $PROJECT/node_modules/@3d-dice/dice-box-threejs
done;
rm -rf $TMP_PATH

