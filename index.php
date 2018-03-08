<?php

  require "vendor/autoload.php";

  $loader = new Twig_Loader_Filesystem(array('twig', 'twig/pages'));
  $twig = new Twig_Environment($loader);

  require "custom-filters.php";

  $parts = explode('/', $_SERVER['REQUEST_URI']);

  $data = array('globals' => array(
    'active_url' => '/' . $parts[1] . '/'
  ));

  // Page or 404
  if(isset($parts[1]) && $parts[1]){
    $page = $parts[1];
    if(file_exists('twig/pages/' . $page . '.twig')){
      $data['globals']['page_name'] = $page;
      echo $twig->render($page.'.twig', $data );
      return;
    } else {
      // Default to 404
      http_response_code(404);
      echo $twig->render('404.twig', $data );
      return;
    }
  }

  // Home page
  $data['globals']['active_url'] = '/';
  echo $twig->render('home.twig', $data );


  // Nothing further
  return;
