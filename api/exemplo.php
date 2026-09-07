<!-- <?php
// use PHPMailer\PHPMailer\PhpMailer;

// include("PHPMailer/src/PHPMailer.php");
// include("PHPMailer/src/Exception.php");
// include("PHPMailer/src/SMTP.php");
// require_once('cors.php');
// require_once('config.php');
// require_once('PHPMailer/src/PHPMailer.php');
// require_once('PHPMailer/src/Exception.php');
// require_once('PHPMailer/src/SMTP.php');

// function gerarCodigo6Digitos()
// {
//   return str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
// }

// function EnviarEmailRecuperacao($emailDestinatario, $codigo)
// {
//   $mail = new PHPMailer(true);
//   $mail->IsSMTP();
//   $mail->SMTPAuth = true;
//   $mail->SMTPSecure = 'ssl'; //'tls'; // Use 'ssl' se o servidor SMTP exigir

//   $mail->Host = 'smtp.hostinger.com';
//   $mail->Port = 465;
//   $mail->Username = 'recuperacao@copaclubeauau.com.br';
//   $mail->Sender = 'recuperacao@copaclubeauau.com.br';
//   $mail->Password = 'Em@il2026';
//   $mail->CharSet = "UTF-8";
//   $mail->SetFrom("recuperacao@copaclubeauau.com.br", "Copa Clube Au Au");
//   $mail->addAddress($emailDestinatario);
//   $mail->isHTML(true);
//   $mail->Subject = "Recuperação de Acesso [Copa Clube Au Au]";

//   $conteudoEmail  = "<div style='margin:auto; width: 500px; background-color:#fff; border:thin solid #babaca;border-radius:4px;box-sizing: border-box; padding: 10px; text-align: center;'>";
//   $conteudoEmail .= "    <div style='text-align: center;'>";
//   $conteudoEmail .= "        <img src='https://copaclubeauau.com.br/images/logo.png' style='width: 250px;'>";
//   $conteudoEmail .= "    </div>";
//   $conteudoEmail .= "    <p>Use o código abaixo para criar uma nova senha.</p>";
//   $conteudoEmail .= "    <p><strong style='font-size:28px'>" . $codigo . "</strong></p>";
//   $conteudoEmail .= "</div>";

//   $mail->Body = $conteudoEmail;

//   if (!$mail->send()) {
//     throw new Exception("Erro no envio do e-mail");
//   }
// }
?>