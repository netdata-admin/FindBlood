var netDilAciklamaLang = "Bu uygulama aracılığıyla acil durumdaki birey için gerekli kanı bulabilirsiniz. Yapmanız gereken kan grubunu seçmek biz sizin için bütün donörlerimize bir haber ileteceğiz ve size en uygun kanı bulacağız.";
var netDilBaslikLang = "Netdata Kan Arama Uygulaması";
var netDilKanSecimLang = "Kan Grubunu Seçiniz";
var netDilSecimLang = "Dil Seçiniz <span class=\"caret\"></span>";
var netDilTurkceLang = "Türkçe";
var netDilIngilizceLang = "İngilizce";
var netDilVeriGosterLang = "Verileri Göster";
var netDilAramaLang = "Ara";
var netDilKanVermeLang = "Ben Veririm";
var netDilKanGrubuLang = "Kan Grubu";

function GetLabels()
{
    $("#netDilSecim").html(netDilSecimLang);
    $("#netDilTurkce").text(netDilTurkceLang);
    $("#netDilIngilizce").text(netDilIngilizceLang);
    $("#netDilVeriGoster").text(netDilVeriGosterLang);
    $("#netDilBaslik").text(netDilBaslikLang);
    $("#netDilAciklama").text(netDilAciklamaLang);
    $("#netDilKanSecim").text(netDilKanSecimLang);
    $("#netDilArama").text(netDilAramaLang);
    $(".netDilKanGrubu").text(netDilKanGrubuLang);
    $(".netDilKanVerme").text(netDilKanVermeLang);
}