//jQuery Call.
(function($){
//Document Ready.
$(document).ready(function() {
    var Menu = {
        
        //클릭할 때, 스크롤에 따라 메뉴 변경되는 것 막기 위한 Boolean.
        _isClick : false,

        init : function() {
            this.layout();
            this.reset();
            this.addEvent();
            this.resetInit();
        },
        layout : function() {
            this.$win = $(window);
            this.$winScroll = $('html, body');
            this.$wrap = $('#wrap');
            this.$gn = this.$wrap.find('#global-nav');
            this.$gnEl = this.$gn.find('a');
            this.$content = this.$wrap.find('.content');
            this.$section = this.$content.find('.section');
        },
        reset : function() {
            this._max = this.$section.length;
        },
        addEvent : function() {
            this.$win.on('scroll', this.onScroll).trigger('scroll');
            this.$gnEl.on('click', this.onClickGN);
        },
        resetInit : function() {
        },
        onClickGN : function(e) {
            e.preventDefault();
            var _this = Menu, $el = $(this),
                index = _this.$gnEl.index(this),
                id = $el.attr('href'),
                $cuSection, sectionT;
            $cuSection = _this.$section.eq(index);
            $cuSection = $(id);
            sectionT = $cuSection.offset().top - _this.$gn.height();
            if(!_this.$gnEl.eq(index).hasClass('active')){
                _this.$gnEl.removeClass('active');
                _this.$gnEl.eq(index).addClass('active');
            }
            _this._isClick = true;
            _this.$winScroll.stop(true).animate({scrollTop : sectionT}, {duration : 500, easing : 'easeInOutQuad', complete : function() {
                //애니메이션이 완료되었을 때.
                setTimeout(function() {
                    //_this._isClick 가 false 된 이후,
                    //window 의 스크롤 이벤트가 발생될 수 있기 때문에. 타이머를 이용하여 조금 이후에 값을 false 로 변경.
                    _this._isClick = false;
                }, 1);
            }});
        },
        onScroll : function(e) {
            var _this = Menu;
            _this._cuScroll = _this.$win.scrollTop();
            if(!_this._isClick) {
                _this.scrollMenu();
            }
            _this.scrollMenuVisible();
            _this._exScroll = _this._cuScroll;
        },
        scrollMenu : function() {
            var _this = Menu;
            $.each(_this.$section, function(index, data){
                var $el = $(data),
                    elT = $el.offset().top,
                    // startLimit = elT - _this.$gn.height(), // 네비게이션의 높이만큼 시작지점을 뺀다.
                    startLimit = elT - _this.$gn.height() - _this.$win.height() / 3, // 네비게이션의 높이만큼 시작지점을 뺀다. + 윈도우 상에서 시작지점이 높이
                    endLimit = startLimit + $el.outerHeight();
                //section - 0 : 120. //첫번 째 section 만 top 좌표가 다르기 때문에 강제로 시작지점을 0 으로 지정.
                if(index === 0) startLimit = 0;
                if(_this._cuScroll >= startLimit && _this._cuScroll < endLimit) {
                    _this.$gnEl.removeClass('active');
                    _this.$gnEl.eq(index).addClass('active');
                }
            });
        },
        scrollMenuVisible : function() {
            var _this = Menu;
            if(_this._cuScroll <= 0){
                if(_this.$gn.hasClass('hide')){
                    _this.$gn.removeClass('hide');
                }
            }
            if(_this._cuScroll < 0) return;
            if(_this._exScroll !== undefined ){
                if(_this._cuScroll > _this._exScroll){ //스크롤의 진행방향 체크.
                    //아래로.
                    //네비게이션이 hide.
                    // _this.$gn.hide();
                    if(!_this.$gn.hasClass('hide')){
                        _this.$gn.addClass('hide');
                    }
                }else{
                    //위로.
                    //네비게이션이 show.
                    // _this.$gn.show();
                    if(_this.$gn.hasClass('hide')){
                        _this.$gn.removeClass('hide');
                    }
                }
            }
        }
    };
    Menu.init();
});
})(jQuery);