<?php 
class TimeController {

    public static function Listar() {
        $times = [];
        $resposta = Time::Listar();
        foreach ($resposta as $linha) {
            $time = new Time($linha['cd_time'], $linha['nm_time']);
            array_push($times, $time);
        }
        return $times;
    }
}
?>