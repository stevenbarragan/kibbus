<?php

class Utils {

    function bresenham($params) {
        $vars = array("x0", "y0", "x1", "y1");
        foreach ($vars as $value) {
            $$value = $params[$value] + 0;
        }

        $dx = abs($x1 - $x0);
        $dy = abs($y1 - $y0);

        $sx = ($x0 < $x1 ) ? 1 : -1;
        $sy = ($y0 < $y1 ) ? 1 : -1;

        $err = $dx - $dy;

        $points = array();

        while ($x0 != $x1 || $y0 != $y1) {

            $points[] = array("x" => $x0, "y" => $y0);

            $e2 = 2 * $err;

            if ($e2 > -$dy) {
                $err = $err - $dy;
                $x0 = $x0 + $sx;
            }

            if ($e2 < $dx) {
                $err = $err + $dx;
                $y0 = $y0 + $sy;
            }
        }

        $points[] = array("x" => $x1, "y" => $y1);
        
        array_shift($points);

        echo json_encode(array("points" => $points));
    }

}

$utils = new Utils();
$utils->$_POST["to_do"]($_POST["params"]);
