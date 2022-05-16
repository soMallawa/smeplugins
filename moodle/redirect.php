<?php
    //Include moodle config
    require_once(__DIR__ . '/../config.php');
    require_once($CFG->dirroot . '/my/lib.php'); 


    require_login();

    $ALLOWED_DOMAIN = "smeconnect.lk";

   
    //Check if url is set
    if(!isset($_GET['url']) && empty($_GET['url'])){
        redirect($CFG->wwwroot);
        return;
    }

    //Get url
    $url = $_GET['url'];
    $urlcheck = preg_match('/^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i', $url);
    if(!$urlcheck){
        redirect($CFG->wwwroot);
        exit();
    }

    //Check if domain is allowed
    $url_domain = parse_url($url, PHP_URL_HOST);

    $exploded_domain = explode(".", $url_domain);
    $root_domain = $exploded_domain[count($exploded_domain) -2] . "." . $exploded_domain[count($exploded_domain) -1];

    if($root_domain != $ALLOWED_DOMAIN){
        redirect($CFG->wwwroot);
        exit();
    }

    //Redirect to url
    header("Location: $url", true, 302);
    exit();
