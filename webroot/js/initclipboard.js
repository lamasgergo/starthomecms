/*var client = new ZeroClipboard($('#clip_button'), { forceEnhancedClipboard: true });

client.on('ready', function(event) {

    client.on('copy', function(event) {
        var clipboard = event.clipboardData;
        clipboard.setData("text/html", $('#copy').html());
         //window.close();
        // self.close();
    } );
    
    client.on("aftercopy", function(e) {
       // window.close();
    });
} );
*/
$('#print').on('click',function(){
    $('.buttons').hide();
    print();
    $('.buttons').show();
    
});
$('#clip_button').on('click',function(e){
    $('.buttons').hide();
    copyToClipboard($('#copy').html()) ;
    document.execCommand('copy');
    e.preventDefault();
    $('.buttons').show();
    
});

$('#clip_buttonen').on('click',function(e){
    $('.buttons').hide();
    copyToClipboard($('#copyen').html()) ;
    $('.buttons').show();                                                      
    
});
$('#clip_buttonhu').on('click',function(e){
    $('.buttons').hide();
    copyToClipboard($('#copyhu').html()) ;
    $('.buttons').show();
    
});
//document.addEventListener('copy', function(e){
//    v='#copy';
//    e.clipboardData.setData('text/plain',  $(v).html());
//    e.clipboardData.setData('text/html', $(v).html());
//    e.preventDefault(); // We want our data, not data from any selection, to be written to the clipboard
//});

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}