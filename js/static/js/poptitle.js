!(function(){
  var ele,text,handler;
  var target;
  function findParent(tar,el){
    if(!tar||!el)
      return false;
    return el===tar||findParent(tar,el.parent);
  }
  $(document).on('mouseover',function(e){
    var touch=false;
    if(ele) {
      touch = touch || findParent(ele, e.target);
      touch = touch || findParent(text, e.target);
      touch = touch || findParent(handler, e.target);
      if(touch){
        // console.log('2');
      }
    }
    if(target) {
      if(e.target===target){
        // console.log('1')
      }
      touch = touch || findParent(target, e.target);
    }
    if(!touch){
      if(ele)
        $(ele).hide();
    }
  });
  $(document).bind('mouseover mouseout mousemove',function (event) {
    var windowHeight=window.innerHeight;
    var cur=event.target;
    var offset=$(cur).offset();
    var width=$(cur).width(),height=$(cur).height();
    var pageY=event.clientY;
    // console.log('pageY:%d',pageY);
    var left = offset.left,top = offset.top,title = $(event.target).attr('poptitle'),type = event.originalEvent.type;
    if(type === 'mouseover'){
      if(title){
        if(!ele) {
          ele = $('<div></div>', { class: 'titleClass'}).css({
            position: 'absolute',
          })[0];
          text=$('<span></span>')[0];
          handler=$('<span></span>').css({position:'absolute',left:'calc(50% - 2.5px)',top:'-2px',transform:'rotate(45deg)',
          backgroundColor:'black',pointEvent:'none',display:'inline-block',width:'5px',height:'5px'})[0];
          $(ele).append(handler);
          $(ele).append(text);
          $(document.body).append(ele);
        }
        target=cur;
        $(text).text(title);
        $(ele).show();
        target=event.target;
        var eleWidth=ele.offsetWidth;
        var eleHeight=$(ele).height();
          var tarLeft=$(target).offset().left;
          var targetWidth=$(target).width();
          $(ele).css({
            left: tarLeft-(eleWidth-targetWidth)/2
          });
        if(windowHeight-pageY<100){
            $(handler).css({bottom:'-2px',top:'auto'})
            $(ele).css({top:top-eleHeight-height});
        }else {
            $(ele).css({top:top+height});
            $(handler).css({top:'-2px',bottom:'auto'})
        }
      }
    }else if (type === 'mouseout'){
      // if(ele&&cur===target) {
      // 	console.log(cur);
      // 	ele.hide();
      // }
    }else if(type === 'mousemove'){
      if(ele);

    }
  })
})();