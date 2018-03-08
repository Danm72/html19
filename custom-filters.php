<?php

  $lang = require "languages/en.php";

  // Language filter
  $twig->addFilter(
    new Twig_SimpleFilter('lang', function ( $key ) use ($lang) {
      if(isset($lang[$key])){
        return new \Twig_Markup($lang[$key], 'utf8');
      }
      return new \Twig_Markup($key, 'utf8');
    }, array('is_safe' => ['html'] ) )
  );

  // Language stats
  $twig->addFilter(
    new Twig_SimpleFilter('data', function ( $key ) use ($lang) {
      if(isset($lang[$key])){
        return $lang[$key];
      }
      return new \Twig_Markup($key, 'utf8');
    }, array('is_safe' => ['html'] ) )
  );

  // Language filter
  $twig->addFilter(
    new Twig_SimpleFilter('amenities', function ( $key ) use ($lang) {
      if(isset($lang['amenities'])){
        return $lang['amenities'][$key];
      }
      return [];
    }, array('is_safe' => ['html'] ) )
  );

  // Image path filter
  $twig->addFilter(
    new Twig_SimpleFilter('img', function ($file){
      return '/img/' . $file;
    })
  );

  // Tel: href filter
  $twig->addFilter(
    new Twig_SimpleFilter('tel', function ($tel){
      return str_replace(' ', '', $tel);
    })
  );

  // HTML safe
  $twig->addFilter(
    new Twig_SimpleFilter('htmlsafe', function ( $str ) {
      return new \Twig_Markup($str, 'utf8');
    })
  );

  // Page meta
  $root_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
  $actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

  $twig->addFunction(new Twig_SimpleFunction('page_meta', function ($key) use ($lang, $root_link, $actual_link) {
    $arr = [];
    $arr['title'] = $lang[$key . '_meta_title'];
    $arr['description'] = $lang[$key . '_meta_description'];

    // Open graph
    $arr['og_url'] = $actual_link;
    $arr['og_title'] = $arr['title'];
    $arr['og_description'] = $arr['description'];
    $arr['og_site_name'] = $lang['site_name'];
    $arr['og_image'] = $root_link . '/img/meta/facebook.jpg';

    // Twitter
    $arr['twitter_title'] = $arr['title'];
    $arr['twitter_site'] = $lang['twitter_handle'];
    $arr['twitter_description'] = $arr['description'];
    $arr['twitter_image'] = $root_link . '/img/meta/twitter.jpg';

    return $arr;
  }));
