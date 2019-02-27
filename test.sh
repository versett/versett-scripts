if [[ -n ${TRAVIS_PULL_REQUEST} ]]
    then
    curl -L "https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64" \
      -o jq
    chmod +x jq
    url="https://api.github.com/repos/org/repo/pulls/$TRAVIS_PULL_REQUEST?access_token=$GH_TOKEN"
    target_branch=$(
      curl "$url" | ./jq '.base.ref' | tr -d '"'
    )
    echo $target_branch
  fi

  echo ${TRAVIS_PULL_REQUEST}
  echo $TRAVIS_PULL_REQUEST
  echo $GH_TOKEN