<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/bootstrap-responsive.min.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/jquery-ui.css">

        <!--[if lt IE 9]>
            <script src="js/vendor/html5-3.6-respond-1.1.0.min.js"></script>
        <![endif]-->
    </head>
    <body>
        <?php
        switch ($_GET["step"]) {
            case "one":
            case "two":
                $step = $_GET["step"];
                break;
            default :
                $step = "two";
        }
        ?>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
        <![endif]-->
        <header class="navbar navbar-inverse navbar-fixed-top" id="header">
            <div class="navbar-inner">
                <div class="container">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <a class="brand" href="#">Kibbus</a>
                    <div class="nav-collapse collapse">
                        <ul class="nav">
                            <li class="active"><a href="#" id="instruction">Instructions</a></li>
                            <li class=""><a href="#" id="why">Why</a></li>
                        </ul>
                    </div><!--/.nav-collapse -->
                </div>
            </div>
        </header>
        <div id="container">
            <div id="plot"></div>
            <div id="controls">
                <?php include 'controlers/' . $step . '.html'; ?>
            </div>
        </div>
        <footer>
            <p>Steven&copy; Company 2012<br />
                <a href="mailto:me@steven.mx">me@steven.mx</a> | <a href="https://twitter.com/steven_barragan">@steven_barragan</a>
            </p>
        </footer>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery.js"><\/script>')</script>
        <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js"></script>
        <script>jQuery.ui || document.write('<script src="js/vendor/jquery-ui.js"><\/script>')</script>
        <script src="js/vendor/bootstrap.min.js"></script>
        <script src="js/vendor/jquery-ui.js"></script>
        <script src="js/plugins.js"></script>
        <script src="js/raphael-min.js"></script>
        <script src="js/step<?php echo $step ?>/kibbus.js"></script>
        <script src="js/step<?php echo $step ?>/forest.js"></script>
        <script src="js/step<?php echo $step ?>/plot.js"></script>
        <script src="js/step<?php echo $step ?>/main.js"></script>
        <script src="js/step<?php echo $step ?>/utils.js"></script>
        <script>
            var _gaq=[['_setAccount','UA-29744528-1'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
                s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
    </body>
</html>