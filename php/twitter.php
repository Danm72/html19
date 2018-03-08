<?php

  require 'TwitterAPIExchange.php';

  define('WOEID', '44418'); // Greater London
  define('MAX_TRENDS', 8);

  $settings = array(
    'oauth_access_token' => "589866911-9CBoAiuQCVptlFv0Z4OhY5y8lid0Px8MxYUWOA0p",
    'oauth_access_token_secret' => "lp81eCUUfjkx84AFiMOSrI3sgSuwpXdSxbCmlLatPETk0",
    'consumer_key' => "LG9g3SeN6czHSp5oO46u0NjvY",
    'consumer_secret' => "MhJIcwgAN49Z2WdqNAjFOM48ihHFVGw2dT786bgb68L3VIt7Oi"
  );


  $twitter = new TwitterAPIExchange($settings);

  switch($_GET['query']){
    case 'images':
      $url = 'https://api.twitter.com/1.1/search/tweets.json';
      $json = $twitter->setGetfield('?q=' . $_GET['q'])->buildOauth($url, 'GET')->performRequest();
    break;

    default:
      $url = 'https://api.twitter.com/1.1/trends/place.json';
      $json = $twitter->setGetfield('?id=' . WOEID)->buildOauth($url, 'GET')->performRequest();
    break;

  }

  header('Content-Type: application/json');
  echo $json;
