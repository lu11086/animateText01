/**
 * Created by Palov on 2017/5/10.
 */
var firstRun = true;
var myWidth = document.documentElement.clientWidth;
var myHeight = 0.01 * document.documentElement.clientHeight;
var mouseX, objX, isDowm = false;
/*预加载图片*/
imgLoader(['img/1-dd-1.png', 'img/1-dd-2.png', 'img/1-dd-3.png', 'img/1-img.png', 'img/1-text.png', 'img/2-dd-1.png', 'img/2-dd-2.png', 'img/2-dd-3.png', 'img/2-dd-4.png', 'img/2-text.png', 'img/bar.png', 'img/bg5-1.jpg', 'img/bg5-2.jpg', 'img/evening.png', 'img/morning.png', 'img/round.png', 'img/title.png', 'img/topBar.png', 'img/topBarBG.png'], function (percentage) {
    var percentT = percentage * 100;
    document.querySelector(".myCoverSpan").innerText = 'Loading ' + (parseInt(percentT)) + '%';
    document.querySelector(".myCoverSpanLine").style.width = percentT + '%';
    if (percentage == 1) {
        document.getElementById("preloader5").setAttribute("class", "fadeOut-An");
        document.querySelector(".myCover").setAttribute("class", "myCover fadeOut-An");
        setTimeout(function () {
            document.getElementById("preloader5").style.display = 'none';
            document.querySelector(".myCover").style.display = 'none';
            document.getElementById("myBarPoint").style.left = 0.5 * myWidth - 2.75 * myHeight + 'px';

            startMyPage();
        }, 1000)
    }
});

/*鼠标拖动部分*/
function mouseDown(obj, e) {
    obj.style.cursor = "move";
    objX = myBarPoint.style.left;
    mouseX = e.clientX;
    isDowm = true;
}

function mouseMove(e) {
    var x = e.clientX;
    if (isDowm) {
        var theResult = (parseInt(x) - parseInt(mouseX) + parseInt(objX));
        if (theResult >= 0.5 * myWidth + 26.25 * myHeight) {
            document.getElementById("myBarPoint").style.left = 0.5 * myWidth + 26.25 * myHeight + "px";
        } else if (theResult <= 0.5 * myWidth - 31.75 * myHeight) {
            document.getElementById("myBarPoint").style.left = 0.5 * myWidth - 31.75 * myHeight + "px";
        } else {
            document.getElementById("myBarPoint").style.left = theResult + "px";
        }
    }
}

function mouseUp(e) {
    var littleChar = 0.5 * myWidth - 16.75 * myHeight;
    var bigChar = 0.5 * myWidth + 11.25 * myHeight;
    if (isDowm) {
        var x = e.clientX;
        var theResult = (parseInt(x) - parseInt(mouseX) + parseInt(objX));
        if (theResult >= 0.5 * myWidth + 26.25 * myHeight) {
            document.getElementById("myBarPoint").style.left = 0.5 * myWidth + 26.25 * myHeight + "px";
        } else if (theResult <= 0.5 * myWidth - 31.75 * myHeight) {
            document.getElementById("myBarPoint").style.left = 0.5 * myWidth - 31.75 * myHeight + "px";
        } else {
            document.getElementById("myBarPoint").style.left = theResult + "px";
        }
        mouseX = x;
        myBarPoint.style.cursor = "pointer";
        //console.log(littleChar + ':' + theResult + ':' + bigChar);
        var myCha, str = '';
        if (littleChar < theResult && theResult < bigChar) {
            myCha = 0.5 * myWidth - 2.75 * myHeight - theResult;
            returnMiddle();
        } else if (theResult <= littleChar) {
            myCha = 0.5 * myWidth - 31.75 * myHeight - theResult;
            opwnMyLeftPage();
        } else {
            myCha = 0.5 * myWidth + 26.25 * myHeight - theResult;
            opwnMyRightPage();
        }
        str += '@keyframes barPointMove {0% {transform: translate(0,0)} 100% {transform: translate(' + myCha + 'px,0)}}';
        var style = document.createElement('style');
        style.name = 'barPointMove';
        style.innerHTML = str;
        var myHead = document.getElementsByTagName('head').item(0);
        myHead.appendChild(style);
        document.getElementById("myBarPoint").setAttribute("class", "barPointMove-An");
        setTimeout(function () {
            document.getElementById("myBarPoint").setAttribute("class", "");
            document.getElementById("myBarPoint").style.left = myCha + theResult + 'px';
            myHead.removeChild(myHead.lastChild);
        }, 750);
        isDowm = false;
    }
}

/*开始动画部分*/
if (!!window.ActiveXObject || "ActiveXObject" in window) {
    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE6.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0") {
        alert("您的浏览器版本过低，请下载IE9以上版本");
    } else {
        /*alert('ie略略略');*/
        /*IE11简直了都不支持vh属性还得劳资自己来*/
        var str = '';
        str += '@keyframes slideUp {0% {top: 100%} 100% {top: 0}}';
        str += '@keyframes fadeToLeft {0% {transform: translate(' + 20 * myHeight + 'px,0);opacity: 0;} 100% {transform: translate(0,0);opacity: 1;}}';
        str += '@keyframes fadeToRight {0% {transform: translate(-' + 20 * myHeight + 'px,0);opacity: 0;} 100% {transform: translate(0,0);opacity: 1;}}';
        str += '@keyframes barPointToLeft {0% {transform: translate(0,0)} 100% {transform: translate(-' + 29 * myHeight + 'px,0)}}';
        str += '@keyframes barPointToRight {0% {transform: translate(-' + 29 * myHeight + 'px,0)} 100% {transform: translate(' + 29 * myHeight + 'px,0)}}';
        str += '@keyframes barPointRightToMiddle {0% {transform: translate(' + 29 * myHeight + 'px,0)} 100% {transform: translate(0,0)}}';
        str += '@keyframes watchToRight {0% {transform: translate(0,0)} 100% {transform: translate(' + 29 * myHeight + 'px,0)}}';
        str += '@keyframes watchToLeft {0% {transform: translate(0,0)} 100% {transform: translate(-' + 29 * myHeight + 'px,0)}}';
        str += '@keyframes watchLeftToRight {0% {transform: translate(-' + 29 * myHeight + 'px,0)} 100% {transform: translate(' + 29 * myHeight + 'px,0)}}';
        str += '@keyframes watchRightToLeft {0% {transform: translate(' + 29 * myHeight + 'px,0)} 100% {transform: translate(-' + 29 * myHeight + 'px,0)}}';
        str += '@keyframes watchLeftToMiddle {0% {transform: translate(-' + 29 * myHeight + 'px,0)} 100% {transform: translate(0,0)}}';
        str += '@keyframes watchRightToMiddle {0% {transform: translate(' + 29 * myHeight + 'px,0)} 100% {transform: translate(0,0)}}';
        str += '@keyframes fadeToLeftTop {0% {transform: translate(' + 20 * myHeight + 'px,' + 10 * myHeight + 'px)} 100% {transform: translate(0,0)}}';
        var style = document.createElement('style');
        style.innerHTML = str;
        document.getElementsByTagName('head').item(0).appendChild(style);
    }
}

function startMyPage() {
    document.querySelector(".myContent").setAttribute("class", "myContent slideUp-An");
    setTimeout(function () {
        document.querySelector(".myBar").setAttribute("class", "myBar fangda-An");
        document.querySelector(".myLeftText").setAttribute("class", "myLeftText fadeToLeft-An");
        document.querySelector(".myRightText").setAttribute("class", "myRightText fadeToRight-An");
        setTimeout(function () {
            opwnMyLeftPage()
        }, 1000)
    }, 500)
}

function opwnMyLeftPage() {
    if (firstRun) {
        document.getElementById("myBarPoint").setAttribute("class", "barPointToLeft-An");
    }
    setTimeout(function () {
        var myleftBackground = document.querySelector(".leftBackground");
        //console.log(Math.round(myleftBackground.clientWidth)+":"+Math.round(0.5 * myWidth));
        var myChar = Math.round(myleftBackground.clientWidth) - Math.round(0.5 * myWidth);
        if (myChar < 0) {
            myleftBackground.setAttribute("class", "myBackground leftBackground fullTheScreenFromEmpty-An");
            document.querySelector(".myRightDom2").setAttribute("class", "myRightDom2 fadeOut-An");
            document.querySelector(".myRightDom1").setAttribute("class", "myRightDom1 fadeOut-An");
            document.querySelector(".myRightDom3").setAttribute("class", "myRightDom3 fadeOut-An");
            document.querySelector(".myRightDom4").setAttribute("class", "myRightDom4 fadeOut-An");
        } else if (myChar == 0) {
            myleftBackground.setAttribute("class", "myBackground leftBackground fullTheScreenFromMiddle-An");
        }

        if (!firstRun) {
            if (document.querySelector(".myLeftText").className != 'myLeftText fadeIn-An') {
                document.querySelector(".myLeftText").setAttribute("class", "myLeftText fadeIn-An");
            }
        }
        document.querySelector(".myRightText").setAttribute("class", "myRightText fadeOut-An");
        setTimeout(function () {
            if (myChar < 0) {
                document.querySelector(".myModel").setAttribute("class", "myModel watchLeftToRight-An");
            } else if (myChar == 0) {
                document.querySelector(".myModel").setAttribute("class", "myModel watchToRight-An");
            }
            setTimeout(function () {
                document.querySelector(".myLeftDom2").setAttribute("class", "myLeftDom2 fadeToLeft-An");
                document.querySelector(".myModelMorning").setAttribute("class", "myModelMorning fadeIn-An");
                setTimeout(function () {
                    document.querySelector(".myLeftDom3").setAttribute("class", "myLeftDom3 fadeToLeft-An");
                    setTimeout(function () {
                        document.querySelector(".myLeftDom1").setAttribute("class", "myLeftDom1 fadeToLeftTop-An");

                        if (firstRun) {
                            setTimeout(function () {
                                opwnMyRightPage()
                            }, 1000)
                        }
                    }, 100)
                }, 100)
            }, 500)
        }, 200)
    }, 700)
}

function opwnMyRightPage() {
    if (firstRun) {
        document.getElementById("myBarPoint").setAttribute("class", "barPointToRight-An");
    }
    setTimeout(function () {
        var myleftBackground = document.querySelector(".leftBackground");
        var myChar = Math.round(myleftBackground.clientWidth) - Math.round(0.5 * myWidth);
        if (myChar > 0) {
            myleftBackground.setAttribute("class", "myBackground leftBackground emptyTheScreenFromFull-An");
            document.querySelector(".myLeftDom1").setAttribute("class", "myLeftDom1 fadeOut-An");
            document.querySelector(".myLeftDom2").setAttribute("class", "myLeftDom2 fadeOut-An");
            document.querySelector(".myLeftDom3").setAttribute("class", "myLeftDom3 fadeOut-An");
            document.querySelector(".myModelMorning").setAttribute("class", "myModelMorning fadeOut-An");
        } else if (myChar == 0) {
            myleftBackground.setAttribute("class", "myBackground leftBackground emptyTheScreenFromMiddle-An");
        }

        if (document.querySelector(".myRightText").className != 'myRightText fadeIn-An') {
            document.querySelector(".myRightText").setAttribute("class", "myRightText fadeIn-An");
        }
        document.querySelector(".myLeftText").setAttribute("class", "myLeftText fadeOut-An");
        setTimeout(function () {
            if (myChar > 0) {
                document.querySelector(".myModel").setAttribute("class", "myModel watchRightToLeft-An");
            } else if (myChar == 0) {
                document.querySelector(".myModel").setAttribute("class", "myModel watchToLeft-An");
            }
            setTimeout(function () {
                document.querySelector(".myRightDom2").setAttribute("class", "myRightDom2 fadeToRight-An");
                setTimeout(function () {
                    document.querySelector(".myRightDom1").setAttribute("class", "myRightDom1 fadeToRight-An");
                    setTimeout(function () {
                        document.querySelector(".myRightDom3").setAttribute("class", "myRightDom3 fadeToRight-An");
                        setTimeout(function () {
                            document.querySelector(".myRightDom4").setAttribute("class", "myRightDom4 fadeToRight-An");

                            if (firstRun) {
                                setTimeout(function () {
                                    returnMiddle()
                                }, 1000);
                            }
                        }, 100)
                    }, 100)
                }, 100)
            }, 500)
        }, 200)
    }, 700)
}

function returnMiddle() {
    var myleftBackground = document.querySelector(".leftBackground");
    var myChar = Math.round(myleftBackground.clientWidth) - Math.round(0.5 * myWidth);
    if (myChar > 0) {
        myleftBackground.setAttribute("class", "myBackground leftBackground middleTheScreenFromFull-An");
        document.querySelector(".myLeftDom1").setAttribute("class", "myLeftDom1 fadeOut-An");
        document.querySelector(".myLeftDom2").setAttribute("class", "myLeftDom2 fadeOut-An");
        document.querySelector(".myLeftDom3").setAttribute("class", "myLeftDom3 fadeOut-An");
        document.querySelector(".myModelMorning").setAttribute("class", "myModelMorning fadeOut-An");
        document.querySelector(".myRightText").setAttribute("class", "myRightText fadeIn-An");
        document.querySelector(".myModel").setAttribute("class", "myModel watchRightToMiddle-An");
    } else if (myChar < 0) {
        myleftBackground.setAttribute("class", "myBackground leftBackground middleTheScreenFromEmpty-An");
        document.querySelector(".myRightDom2").setAttribute("class", "myRightDom2 fadeOut-An");
        document.querySelector(".myRightDom1").setAttribute("class", "myRightDom1 fadeOut-An");
        document.querySelector(".myRightDom3").setAttribute("class", "myRightDom3 fadeOut-An");
        document.querySelector(".myRightDom4").setAttribute("class", "myRightDom4 fadeOut-An");
        document.querySelector(".myLeftText").setAttribute("class", "myLeftText fadeIn-An");
        document.querySelector(".myModel").setAttribute("class", "myModel watchLeftToMiddle-An");
        if (firstRun) {
            firstRun = false;
            document.getElementById("myBarPoint").setAttribute("class", "barPointRightToMiddle-An");
        }
    }
}
