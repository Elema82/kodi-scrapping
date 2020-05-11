
/**
 *
 *
 <a href="" class="card dropdown-toggle" data-toggle="dropdown" title="La 1 (geobloqueo eventual)">
 <img src="http://photocall.xyz/images/LA1.png">
 </a>
 <ul class="dropdown-menu">
 <li><a href="http://photocall.xyz/tve?ch=la1" target="_blank">Directo</a></li>
 <li><a href="http://photocall.xyz/tve?ch=la1_cat" target="_blank">Catalunya</a></li>
 <li><a href="http://photocall.xyz/tve?ch=la1_can" target="_blank">Canarias</a></li>
 <li><a href="http://photocall.xyz/l1?ch=la1_dvr_geo" target="_blank">DVR Geo</a></li>
 <li><a href="http://photocall.xyz/l1?ch=la1_dvr" target="_blank">DVR</a></li>
 <!--
 <li><a href="http://photocall.xyz/tp?ch=tve" target="_blank">TVE Int</a></li>
 <li><a href="http://photocall.xyz/tp?ch=startve" target="_blank">Star TVE</a></li>
 -->
 <li><a href="http://photocall.xyz/vgd2?ch=la1" target="_blank">Otro</a></li>
 </ul>
 */

$("section > .canales > .dropdown").each(function(index, element) {

    let section = $(this).parent().parent().attr('id');

    let sourceWeb = "photocall.tv";
    let indexChannel = index + 1;
    let channelTitle = $(element).find(".card").attr('title');
    let channelImage = $(element).find(".card > img").attr('src');

    let contentType = '';
    // cantidad sources por section
    // console.log($(this).parent().parent().attr('id'));

    if (section == 'content1')
        contentType = "Nacional";
    if (section == 'content2')
        contentType = "Internacional";
    if (section == 'content3')
        contentType = "Otro";
    if (section == 'content4')
        contentType = "Radio";

    let insertChannel = '<p> insert into channels (indexer, name, image, source_web) values (' + indexChannel + ' , "' + channelTitle + '", "' + channelImage + '", "' + sourceWeb + '"); </p>';
    $(".database").append(insertChannel);

    // console.log("Canal: " + channelTitle);
    // console.log("Imagen Canal: " + channelImage);
    $(element).find("ul > li > a").each(function (index2, element) {

        let indexSource = index2 + 1;
        let sourceName = $(element).text();
        let sourceUrl = $(element).attr('href');

        // console.log("Nombre fuente: " + sourceName);
        // console.log("Fuente: " + sourceUrl);

        let insertSource = '<p> insert into source_channels (channel, indexer, name, target_url) values (' + indexChannel + ' , ' + indexSource + ' , "' + sourceName + '", "' + sourceUrl + '"); </p>';

        $(".database").append(insertSource);
        // $(".database").append( "<br><br>" );
    });

    $('body').css('background-color','#fff');
    $(".tab, input, label, .dropdown, section > .canales > .dropdown").hide();

});