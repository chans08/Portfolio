/**
 * @projectDescription 공통 라이브러리 모음
 *
 * @author 박난하 nanhap@gmail.com
 * @version 1.0
 * @sdoc null
 * @date 2007-02-22 오후 4:27
 */

// 문자열 프로토타입
String.prototype.ltrim = new Function("return this.replace(/^\\s+/,'')"); // trim left
String.prototype.rtrim = new Function("return this.replace(/\\s+$/,'')"); // trim right
String.prototype.trim = new Function("return this.replace(/^\\s+|┕|\\s+$/g,'')"); // trim both
String.prototype.strip = new Function("return this.replace(/^\s+/, '').replace(/\s+$/, '')");
String.prototype.number_format = function()
{
	return this.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1,');
}

// 문자열 태그제거
String.prototype.stripTag = function() {
	return this.replace(/<[^>]+>/g, '');
}
String.prototype.toArray = new Function("return this.split('')");

Array.prototype.each = function(iterator)
{
	for(var i = 0, length = this.length; i < length; i++)
		iterator(this[i]);
}

// 배열에 검색한 값이 있으면 인덱스 번호를 리턴, 없으면 -1을 리턴
Array.prototype.search = function(val)
{
	var len = this.length;
	for (var i = 0; i < len; i++)
	{
		if(this[i].trim() == val.trim()) return i;
	}

	return -1;
}

// 배열의 각 요소에 같은 함수 적용
// 만약, funcName 이라는 함수가 있다고 하면, Array.walk(funcName)과 같이 사용한다.
// 함수의 첫번째 전달자에 값이, 두번째 전달자에 인덱스가 전달된다.
Array.prototype.walk = function(Func)
{
	var len = this.length;
	for (var i = 0; i<len; i++)
	{
		this[i] = Func(this[i], i);
	}
}

// 배열내에 존재하는 숫자를 모두 더한다.
Array.prototype.sum = function()
{
	var ret = 0;
	for (var i = 0; i<this.length; i++)
	{
		if((typeof this[i]).toLowerCase() == 'number') ret += this[i];
	}
	return ret;
}

// apply method 사용
// 이벤트발생시 함수에 전달할때 클래스안의 this 를 포함한다.
/*
Function.prototype.bind = function()
{
	var method = this;
	var args = [];
	for (var i = 0, length = arguments.length; i < length; i++)
		args.push(arguments[i]);
	var object = args.shift(); // 첫번째 인자
	return function()
		{
			return method.apply(object, args.concat(args));
		}
}
*/
Function.prototype.bind = function()
{
	for ( var i = 0, method = this , args = [] , len = arguments.length ; i < len ; i++ )
    {
		args.push( arguments[ i ] );
    }
	return function()
    {
        return method.apply( args[0] , args.slice(1) );
    }
}
/**
 * 배열을 n번 섞는다
	ex)
	var test = [1,2,3,4];
	test.shuffle(2);
	alert(test);
 * @param {Number} n 석는횟수
 */
Array.prototype.shuffle = function(n)
{
	var i, j, k;
	var temp;

	for (i = 0; i < n; i++)
	{
		for (j = 0; j < this.length; j++)
		{
			k = Math.floor(Math.random() * this.length);
			temp = this[j];
			this[j] = this[k];
			this[k] = temp;
		}
	}
	this._index = 0;
}

/**
 * 연관배열의 각 원소의 key, value를 사용하는 콜벡함수를 실행
    ex)
        var a = new Array;
        a['test_index1'] = 100;
        a['test_index2'] = '300px';
        a.foreach(
            function ( k , v )
            {
                alert( 'key : ' + k + '/' + 'value : ' + v );
            }
        );
 * @param { Function } callback
 */
 Array.prototype.foreach = function( callback )
 {
    //현재 인스턴스의 method , property
     for( K in this )
     {
         var key = K;
        // Array 프로토타입 method , property
         for( pK in Array.prototype ) if( K === pK ) key = null;
         if( key ) callback.call( null , K , this[ K ] );
     }
 }

/**
 * 배열 오브젝트에서 가장 큰값 구하기
 * @param {Null}
 * @return {Number}
 * @author 박난하 nanhap@gmail.com
 * @date 2007-03-26
 */
Array.prototype.max = function()
{
	var val;
	for( var i = 0; i < this.length; i++ )
	{
		if( typeof val == 'undefined' ) val = this[i];
		else
		{
			if( this[i] > val )
			{
				val = this[i];
			}
		}
	}

	return val;
}

/**
 * 배열 오브젝트에서 가장 작은값 구하기
 * @param {Null}
 * @return {Number}
 * @author 박난하 nanhap@gmail.com
 * @date 2007-03-26
 */
Array.prototype.min = function()
{
	var val;
	for( var i = 0; i < this.length; i++ )
	{
		if( typeof val == 'undefined' ) val = this[i];
		else
		{
			if( this[i] < val )
			{
				val = this[i];
			}
		}
	}

	return val;
}

function log(val)
{
	var objLog = document.getElementById('log');
	if( objLog == null )
	{
		var o = document.createElement('textarea');
		o.style.position = 'absolute';
		o.style.top = '10px';
		o.style.left = ( document.body.offsetWidth - 300 ) +'px';
		o.style.width = '300px';
		o.setAttribute('id', 'log');
		o.setAttribute('rows', 100);
		document.body.appendChild(o);
	}

	if( val ) objLog.value += val +"\n";
}

/**
 * debug for object
 * @param {Object, String} o
 * @param {Object object} options
 * @author 박난하 nanhap@gmail.com
 * @date 2007-02-13
 */
function debug(o, options)
{
	// check
	if( o == null ) return;
	if( typeof options == 'undefined' ) options = {pos: false};

	// process
	if( typeof o == 'string' || typeof o == 'number' )
	{
		var debugStr = o;
	}
	else
	{
		// process #2
		var debugStr = '<table border="1">';
		for( i in o )
		{
			//if( o[i] == '[object HTMLFormElement]' ) continue;
			debugStr += '<tr><td><b>' + i + '</b></td><td>' + o[i] + '</td><td>' + typeof o[i] + '</td></tr>';

			if( options.optSub == 1 )
			{
				if( typeof o[i] == 'object' )
				{
					for( j in o[i] )
					{
						debugStr += '======>' + j + '=' + o[i][j] + '<br>';
					}
				}
			}
		}
		debugStr += '</table>';
		if( options.cookie == true ) debugStr += 'document.cookie:' + document.cookie + '<br>';
	}

	var divObj = document.createElement('div');
	divObj.id = 'debug';
	if( options.pos == true )
	{
		divObj.style.position = 'absolute';
		divObj.style.top = ( options.top || 0 ) + 'px';
		divObj.style.left = ( options.left || 500 ) + 'px';
		divObj.style.zIndex = options.zIndex || 10000;
	}
	divObj.innerHTML = debugStr;
	document.body.appendChild(divObj);
}

/**
 * 오브젝트 확장
 * @param {Object} destination
 * @param {Object} source
 * @return {Object}
 * @author 박난하 nanhap@gmail.com
 * @date 2007-03-09
 */
Object.extend = function(destination, source)
{
	for(var property in source)
	{
		destination[property] = source[property];
	}
	return destination;
}

/**
 * 이벤트 설정 크로스브라우징
 * @param {Object} elm
 * @param {String} evType 이벤트 타입
 * @return {Function} fn 함수명
 * @author 박난하 nanhap@gmail.com
 * @date 2007-03-16
 */
function addEvent(elm, evType, fn, capture)
{
	if( !capture ) var capture = true;
	if(elm.addEventListener)
	{
		elm.addEventListener(evType, fn, capture);
		return true;
	}
	else if(elm.attachEvent)
	{
		var r = elm.attachEvent('on' + evType, fn);
		return r;
	}
	else
	{
		elm['on' + evType] = fn;
	}
}

/**
 * sprint 함수 javascript version
 * @param {String} lang
 * @return {String}
 * @author 박난하 nanhap@gmail.com
 * @date 2007-03-09
 */
function printf(lang)
{
	var args = printf.arguments;
	for( var i = 0; i < args.length; i++ )
	{
		if( typeof args[i + 1] == 'undefined' ) continue;
		lang = lang.replace('%s' + i, args[i + 1]);
	}

	return lang;
}

/**
 * php rand javascript version
 * @param {Number} num 최대숫자
 * @return {Number}
 * @author 박난하 nanhap@gmail.com
 * @date 2007-03-09
 */
function ranx(num)
{
	var ran = Math.random( );
	var ten = ran * num;
	var integ = Math.ceil(ten);
	return integ;
}

/**
 * 체크박스 checked 관련
 * ex)
	<input type="checkbox" name="chk[]"/>
	<input type="checkbox" name="chk[]"/>
	<input type="checkbox" name="chk[]"/>
	<input type="button" value="foo" onclick="checkbox({name:'chk[]'}); return false;" />
	<input type="button" value="foo" onclick="checkbox({name:'chk[]', mode:'check', msg:'선택'}); return false;" />
 * @param {Object object} options {name:''[, mode: 'un or all or check or null']}
 * @return {Null}
 * @author 박난하 nanhap@gmail.com
 * @date 2007-03-09
 */
function checkbox(options)
{
	var o = document.getElementsByName(options.name);
	if( o == null ) return;

	switch(o.length)
	{
		case 0:
			var o = document.getElementById(options.name);
			if( o == null ) return;
			if( o.checked == true ) var chk = true;
			break;
		default:
			for( var i = 0; i < o.length; i++ )
			{
				switch(options.mode)
				{
					default:
						o[i].checked =! o[i].checked;
						break;
					case 'un':
						o[i].checked = false;
						break;
					case 'all':
						o[i].checked = true;
						break;
					case 'check':
						if( o[i].checked == true ) var chk = true;
						break;
					case 'val':
						if( o[i].checked == true ) var val = i;
						break;
				}
			}
			break;
	}

	if( options.mode == 'check' && chk != true )
	{
		if( typeof options.msg != 'undefined' ) alert(options.msg);
		return false;
	}
	else if( options.mode == 'val' )
	{
		if(typeof val == 'undefined') return -1;
		return o[val].value;
	}
}

/**
 * 오브젝트 감추기 보이기
 * @param {String} id
 * @return {Null}
 * @author 박난하 nanhap@gmail.com
 * @date 2007-03-09
 */
function showObj(id)
{
	if(document.getElementById(id).style.display == 'none')
	{
		document.getElementById(id).style.display = 'block';
		return 'block'
	}
	else
	{
		document.getElementById(id).style.display = 'none';
		return 'none'
	}
}

// 숫자포맷
function chkNumberFormat(fn)
{
	var str = fn.value;
	var Re = /^0([0-9])+|[^0-9]/g;
	var ReN = /(-?[0-9]+)([0-9]{3})/;
	str = str.replace(Re,'$1');

	while (ReN.test(str))
	{
		str = str.replace(ReN, "$1,$2");
	}

	fn.value = str;
}

// null
function chkNull(_value)
{
	var reg = /\s+/g;
	_value = _value.replace(reg,'');
	if(_value == '' || _value == null) return false;
	return true;
}

// 사업자 번호
function chkResidentid(biz_no)
{
	if(biz_no.length == 10)
	{
		a = biz_no.charAt(0);
		b = biz_no.charAt(1);
		c = biz_no.charAt(2);
		d = biz_no.charAt(3);
		e = biz_no.charAt(4);
		f = biz_no.charAt(5);
		g = biz_no.charAt(6);
		h = biz_no.charAt(7);
		i = biz_no.charAt(8);
		Osub	 = biz_no.charAt(9);

		suma = a*1 + b*3 + c*7 + d*1 + e*3 + f*7 + g*1 + h*3;
		sumb = (i*5) %10;
		sumc = parseInt((i*5) / 10,10);
		sumd = sumb + sumc;
		sume = suma + sumd;
		sumf = a + b + c + d + e + f + g + h + i
		k = sume % 10;
		Modvalue = 10 - k;
		LastVal = Modvalue % 10;

		if(sumf == 0)
		{
			alert("사업자번호가 올바르지 않습니다. 다시입력하여 주십시오");
			return false;
		}
	}
	else
	{
		alert("사업자번호가 올바르지 않습니다. 다시입력하여 주십시오");
		return false;
	}
	if(Osub == LastVal)
	{
		return true;
	}
	else
	{
		alert("사업자번호가 올바르지 않습니다. 다시입력하여 주십시오");
		return false;
	}
}

// 공백체크
function chkSpace(strValue)
{
	if(strValue.indexOf(" ")>=0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

// 이메일체크
function chkEmail(strValue)
{
	if((strValue.length != 0) && (strValue.search(/(\S+)@(\S+)\.(\S+)/) == -1))
	{
		return false;
	}
	else
	{
		return true;
	}
}

// 한글체크
function chkHan(strValue)
{
	for(var i = 0;i<strValue.length;i++)
	{
		var a = strValue.charCodeAt(i);
		if( a > 128 )
		{
			var ret = true;
		}
		else
		{
			var ret = false;
		}
	}

	return ret;
}

// 숫자체크
function chkNum(inputname)
{
	var formstr=eval(inputname);
	for(var i = 0;i<formstr.value.length;i++)
	{
		var chr=formstr.value.substr(i,1);
		if((chr<'0'||chr>'9') && chr!='-' && chr!='_')
		{
			return false;
		}
	}
	return true;
}

/***************************************************
 * 주민번호 체크
	ssn.init(주민번호값13자리)
 * @param	juminno	 string	주민번호값13자리
 * @return	 boolen
 * @author	박난하
 * @date	   2007-02-23 오후 1:30
 **************************************************/
var ssn = {
	juminno: null,
	init: function(juminno)
	{
		this.juminno = juminno;
		if( this.juminno=="" || this.juminno==null )
		{
			alert("주민등록번호를 적어주십시오.");
			return false;
		}
		var jumin1 = this.juminno.substr(0,6);
		var jumin2 = this.juminno.substr(6,7);
		var yy = jumin1.substr(0,2);		// 년도
		var mm = jumin1.substr(2,2);		// 월
		var dd = jumin1.substr(4,2);		// 일
		var genda = jumin2.substr(0,1);		// 성별
		var msg, ss, cc;

		// 숫자가 아닌 것을 입력한 경우
		if( this.isNumeric(jumin1) == false )
		{
			alert("주민등록번호 앞자리를 숫자로 입력하십시오.");
			return false;
		}
		// 길이가 6이 아닌 경우
		if( jumin1.length != 6 )
		{
			alert("주민등록번호 앞자리를 다시 입력하십시오.");
			return false;
		}
		// 첫번째 자료에서 연월일(YYMMDD) 형식 중 기본 구성 검사
		if(yy < "00" || yy > "99" ||
				mm < "01" || mm > "12" ||
				dd < "01" || dd > "31") {
				alert("주민등록번호 앞자리를 다시 입력하십시오.");
				return false;
		}
		// 숫자가 아닌 것을 입력한 경우
		if( this.isNumeric(jumin2) == false )
		{
			alert("주민등록번호 뒷자리를 숫자로 입력하십시오.");
			return false;
		}
		// 길이가 7이 아닌 경우
		if( jumin2.length != 7 )
		{
			alert("주민등록번호 뒷자리를 다시 입력하십시오.");
			return false;
		}
		// 성별부분이 1 ~ 4 가 아닌 경우
		if( genda < "1" || genda > "4" )
		{
			alert("주민등록번호 뒷자리를 다시 입력하십시오.");
			return false;
		}
		// 연도 계산 - 1 또는 2: 1900년대, 3 또는 4: 2000년대
		cc = (genda == "1" || genda == "2") ? "19" : "20";
		// 첫번째 자료에서 연월일(YYMMDD) 형식 중 날짜 형식 검사
		if( this.isYYYYMMDD(parseInt(cc+yy), parseInt(mm), parseInt(dd)) == false )
		{
			alert("주민등록번호 앞자리를 다시 입력하십시오.");
			return false;
		}
		// Check Digit 검사
		if( this.isSSN(jumin1, jumin2) == false )
		{
			alert("입력한 주민등록번호를 검토한 후, 다시 입력하십시오.");
			return false;
		}
		return true;
	},

	isYYYYMMDD: function(y, m, d)
	{
		switch(m)
		{
			// 2월의 경우
			case 2:
				if(d > 29) return false;
				// 2월 29의 경우 당해가 윤년인지를 확인
				if(d == 29)
				{
					if((y % 4 != 0) || (y % 100 == 0) && (y % 400 != 0)) return false;
				}
				break;
			// 작은 달의 경우
			case 4:
			case 6:
			case 9:
			case 11:
				if(d == 31) return false;
			}
			// 큰 달의 경우
			return true;
	},

	// 숫자체크
	isNumeric: function(s)
	{
		for(var i = 0; i<s.length; i++) {
				c = s.substr(i, 1);
				if(c < "0" || c > "9") return false;
		}
		return true;
	},

	// 주민번호
	isSSN: function(s1, s2)
	{
		n = 2;
		sum = 0;
		for (var i = 0; i<s1.length; i++)
				sum += parseInt(s1.substr(i, 1)) * n++;
		for (var i = 0; i<s2.length-1; i++) {
				sum += parseInt(s2.substr(i, 1)) * n++;
				if(n == 10) n = 2;
		}
		c = 11 - sum % 11;
		if(c == 11) c = 1;
		if(c == 10) c = 0;
		if(c != parseInt(s2.substr(6, 1))) return false;
		else return true;
	}
}

/**
 * 셀렉트 박스 option 이동

	<select id="s" size="8">
	<option value="1 번 메뉴 입니다">1 번 메뉴 입니다</option>
	<option value="2 번 메뉴 입니다">2 번 메뉴 입니다</option>
	<option value="3 번 메뉴 입니다">3 번 메뉴 입니다</option>
	<option value="4 번 메뉴 입니다">4 번 메뉴 입니다</option>
	<option value="5 번 메뉴 입니다">5 번 메뉴 입니다</option>
	<option value="6 번 메뉴 입니다">6 번 메뉴 입니다</option>
	</select>
	<div>
	<a href="javascript:menuMove('s','first')">처음</a> |
	<a href="javascript:menuMove('s','up')">위로</a> |
	<a href="javascript:menuMove('s','down')">아래로</a> |
	<a href="javascript:menuMove('s','last')">마지막</a>
	</div>

 * @param	id		  string	selectbox object
 * @param	mode	string	'first', 'last', 'up', 'down'
 * @return	 null
 * @date	   2007-02-23 오후 5:55
 */
function sltMenuMove(id, mode)
{
	var obj = document.getElementById(id);
	var idx = obj.selectedIndex;
	if (idx < 0) idx = obj.selectedIndex = 0;
	var opt = obj.options[obj.selectedIndex];

	switch(mode)
	{
		case 'first':
			obj.insertBefore(opt, obj.options[0]);
			break;
		case 'last':
			obj.appendChild(opt);
			break;
		case 'up':
			if (idx > 0) obj.insertBefore(opt, obj.options[idx-1]);
			break;
		case 'down':
			if (idx < obj.options.length-1) obj.insertBefore(obj.options[idx+1], opt);
			break;
	}
}

/**
 * return nodevalue after search xml dom
	<book>
		<title></title>
		<publisher></publisher>
		<author></author>
	</book>
 * @param	id		  obj	object
 * @param	id		  tag	string
 * @return	 string
 * @date	   2007-02-23 오후 5:55
 */
function getNodeValue(obj,tag)
{
	return obj.getElementsByTagName(tag)[0].firstChild.nodeValue;
}

/**
 * 아이디는 영자 혹은 영숫자조합으로 이루어져야 하며 숫자가 첫째 자리에 올 수 없습니다.
 * @param {String} field 체크할 오브젝트 아이디
 * @return {Boolen} true / false
 */
function isMixedNum(field, msg)
{
	var o = document.getElementById(field);
	var str = o.value;
	var theValue = false;
	for( var i = 0; i < str.length; i++ )
	{
		var cha = str.substring(i, i+1);
		if( (cha >= "A") && (cha <= "Z")) theValue = true;
		else if ( (cha >= "a") && (cha <= "z")) theValue = true;
		else if ( (cha >= 0) && (cha <= 9)) theValue = true;
		else
		{
			if( msg == true )
				alert('영자 혹은 영숫자조합으로 이루어져야 하며\r\n숫자가 첫째 자리에 올 수 없습니다.');
			o.focus();
			return theValue;
		}
	}

	return theValue;
}

/**
 * 대문자 체크
 * @param {String} field 체크할 오브젝트 아이디
 * @param {String} msg alert 실행 유무
 * @return {Boolen} true / false
 */
function chkUpper(field, msg)
{
	var o = document.getElementById(field);
	for(var i = 0; i < o.value.length; i++)
	{
		var a = o.value.charCodeAt(i);
		if(a >= 65 && a <= 90)
		{
			if( msg == true ) alert("대문자가 포함되어져 있습니다.");
			o.focus();
			return false;
		}
	}

	return true;
}

/**
 * 아이프레임 높이 조절
 * @param {String} x object id
 * @return {Null}
 * @author 박난하
 */
function ifh(x)
{
	var tmpTerm = 200;
	var o = document.getElementById(x);
	if( document.all )
	{
		o.onreadystatechange = function()
		{
			if( o.readyState == 'complete' )
			{
				o.style.height = ( o.contentWindow.document.body.scrollHeight + tmpTerm ) + 'px';
			}
		}
	}
	else
	{
		o.onload = function()
		{
			o.style.height = o.contentWindow.document.body.scrollHeight + 'px';
		}
	}
}

/***************************************************************
 * 날짜관련 함수
 * ex)
		var today = dt.today();
		this.g('year').value = today.y;
		this.g('month').value = today.m.replace('0', '');
		this.g('day').value = today.d.replace('0', '');

		var yesterday = dt.yesterday();
		this.g('year').value = yesterday.y;
		this.g('month').value = yesterday.m.replace('0', '');
		this.g('day').value = yesterday.d.replace('0', '');

		// 저번달
		dt.oneDayTS = dt.oneDayTS * 30;
		var yesterday = dt.yesterday();
		this.g('year').value = yesterday.y;
		this.g('month').value = yesterday.m.replace('0', '');

		// 이번달
		dt.oneDayTS = dt.oneDayTS * 30;
		var today = dt.today();
		this.g('year').value = today.y;
		this.g('month').value = today.m.replace('0', '');

 * @author 박난하
 * @date 2007-03-07
 *****************************************************************/
var dt = {
	todayDate: new Date(),
	oneDayTS: 24*60*60*1000,
	past: {},
	now: {},
	next: {},

	/**
	 * 오늘 타임스탬프
	 * @param {Null}
	 * @return {Object object}
	 */
	today: function()
	{
		var ty = this.todayDate.getFullYear();
		var tm = this.todayDate.getMonth() + 1;
		var td = this.todayDate.getDate();

		if( tm < 10 ) tm = '0' + tm;
		if( td < 10 ) td = '0' + td;

		this.now.y = ty;
		this.now.m = parseInt(tm);
		this.now.d = parseInt(td);

		return this.now;
	},

	/**
	 * 어제 타임스탬프
	 * @param {Null}
	 * @return {}
	 */
	yesterday: function()
	{
		var y = new Date( this.todayDate.valueOf() - this.oneDayTS );
		var yy = y.getFullYear();
		var ym = y.getMonth() + 1;
		var yd = y.getDate();

		if( ym < 10 ) ym = '0' + ym;
		if( yd < 10 ) yd = '0' + yd;

		this.past.y = yy;
		this.past.m = parseInt(ym);
		this.past.d = parseInt(yd);

		return this.past;
	},

	/**
	 * 내일 타임스탬프
	 * @param {Null}
	 * @return {}
	 */
	tommorrow: function()
	{
		var t = new Date( this.todayDate.valueOf() + this.oneDayTS );
		var yy = t.getFullYear();
		var ym = t.getMonth() + 1;
		var yd = t.getDate();

		if( ym < 10 ) ym = '0' + ym;
		if( yd < 10 ) yd = '0' + yd;

		this.next.y = ty;
		this.next.m = parseInt(tm);
		this.next.d = parseInt(td);

		return this.next;
	}
}

/**
 * 외부 URL 인지 아닌지 판별
 * @param {Object} o
 * @return {Boolen}
 * @author 박난하 nanhap@gmail.com
 * @date 2007-03-13
 */
function chkOutUrl(o)
{
	try {
		var ret = o.contentWindow.document.body;
		return false;
	}
	catch(e)
	{
		return true;
	}
}

/**
 * 브라우져?
 * @param {Null}
 * @return {String}
 * @author 박난하 nanhap@gmail.com
 * @date 2007-03-15
 */
function getBrowserType()
{
	var detect = navigator.userAgent.toLowerCase();
	var browser;
	var doCheckIt = function(bString)
	{
		place = detect.indexOf(bString) + 1;
		return place;
	};
	if (doCheckIt('konqueror')) { browser = 'konqueror'; }
	else if (doCheckIt('safari')) { browser = 'safari'; }
	else if (doCheckIt('omniweb')) { browser = 'omniweb'; }
	else if (doCheckIt('opera')) { browser = 'opera'; }
	else if (doCheckIt('webtv')) { browser = 'webtv'; }
	else if (doCheckIt('icab')) { browser = 'icab'; }
	else if (doCheckIt('msie')) { browser = 'msie'; }
	else if (doCheckIt('firefox')) { browser = 'firefox'; }
	else if (!doCheckIt('compatible')) { browser = 'nn'; }
	return browser;
}

/**
 * validate image
 * @param {String} filename
 * @return {Boolen} true/false
 */
function validateImg(filename)
{
	if( filename.match(/\.(jpg|jpeg|gif|bmp)$/i) ) return true;
	else return false;
}

/**
 * 팝업창 가운데 띄우기
 * @param {Object object} url ,name, w, h, opt
 * @return {Void}
 * @author 박난하 nanhap@gmail.com
 * @date 2007-04-12
 */
function popWinC(options)
{
	var x = screen.width / 2 - options.w / 2;
	var y = screen.height / 2 - options.h / 2;
	o = options.opt + ',width=' + options.w + ',height=' + options.h + ',left=' + x + ',top=' + y;
	newwindow = window.open(options.url, options.name || '', o);
	newwindow.focus();
}

/**
 * 스크롤 Y 값 가져오기
 * @param {Void}
 * @return {Array}
 * @author 박난하
 * @date 2007-04-15
 */
function getPageScroll()
{
	var yScroll;

	if (self.pageYOffset)
	{
		yScroll = self.pageYOffset;
	}
	else if(document.documentElement && document.documentElement.scrollTop)
	{
		yScroll = document.documentElement.scrollTop;
	}
	else if(document.body)
	{
		yScroll = document.body.scrollTop;
	}

	return yScroll;
}

/**
 * 페이지 너비 값 가져오기
 * quirkmode.com 감사 ^^
 * @param {Void}
 * @return {Array}
 * @author 박난하 nanhap@gmail.com
 * @date 2007-04-17
 */
function getPageSize()
{
	var xScroll, yScroll;

	if (window.innerHeight && window.scrollMaxY) {
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}

	var windowWidth, windowHeight;
	if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}

	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else {
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}

	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight, xScroll, yScroll)
	return arrayPageSize;
}

// 절대 높이 계산
function getAbsoluteTop(oNode)
{
	var oCurrentNode=oNode;
	var iTop=0;
	while(oCurrentNode.tagName!="BODY")
	{
		iTop+=oCurrentNode.offsetTop;
		oCurrentNode=oCurrentNode.offsetParent;
	}
	return iTop;
}

// 절대 좌측 계산
function getAbsoluteLeft(oNode)
{
	var oCurrentNode=oNode;
	var iLeft=0;
	while(oCurrentNode.tagName!="BODY")
	{
		iLeft+=oCurrentNode.offsetLeft;
		oCurrentNode=oCurrentNode.offsetParent;
	}
	return iLeft;
}

// open modal window
function openModal(obj, file_name, width, height)
{
	var rand = Math.random() * 4;
	window.showModalDialog(file_name + '?rand=' + rand, obj, 'dialogWidth=' + width + 'px;dialogHeight=' + height + 'px;resizable=no;status=no;scroll=no;help=no');
}

function moveA(Name)
{
    var objs = document.getElementsByName(Name);

    if (Name == "" || Name == "top") document.body.scrollTop = 0;
    if (objs == null || objs.length == 0) return false;
    if (typeof moveA.obj == "undefined") {
        moveA.obj = document.createElement("A");
        moveA.obj.href = "#";
        document.body.appendChild(moveA.obj);
    }

    // focus on the bottom of the page
    moveA.obj.style.display = "";
    moveA.obj.focus();
    moveA.obj.style.display = "none";

    if (objs[0].tagName.toLowerCase() == "a") { // for IE
        var ref = objs[0].href;
        objs[0].href = "#";
        objs[0].focus();
        if (ref == "") objs[0].removeAttribute("href");
        else objs[0].href = ref;
    } else {
        objs[0].focus();
    }
    objs[0].blur();

    return false;
}

//
// row 단위 색상변경 (by 행복한고니)
//
function rowCh(obj, fixed_row)
{
	var args = rowCh.arguments;
	var argl = args.length;
	var TRs = new Array;
	var idx, orgColor, colorIdx=0;

	if (argl < 3) return;
	if (typeof(obj.already) == 'undefined') obj.already = false;
	if (obj.already) return;

	TRs = obj.getElementsByTagName('TR');
	for (idx=fixed_row; idx<TRs.length; idx++)
	{
			orgColor = TRs[idx].bgColor;
			if (TRs[idx].style.backgroundColor.toString().length > 0) orgColor = TRs[idx].style.backgroundColor;

			TRs[idx].onmouseover = new Function('this.style.backgroundColor="'+(args[2+colorIdx])+'";');
			TRs[idx].onmouseout = new Function('this.style.backgroundColor="'+orgColor+'";');

			if (++colorIdx > argl-3) colorIdx = 0;
	}

	obj.already = true;
}

// 영역 페이지 자동 확인하기
function confirmPage(type, url)
{
	// 절대 주소일 경우
	if( url.indexOf('http') != -1 )
	{
		window.open(url, '_blank');
		return;
	}

	switch(type)
	{
		// malladmin
		default:
		case 1:
			var actionUrl = 'http://ect760.cafe24.com/admin/confirmPage.php';
			break;
	}

	actionUrl += '?page=' + url;

	stf.init({
		method: 'get',
		action: actionUrl,
		debug: false
	});
}

/**
 * 엘리먼트 수정시
 * selected, checked
 * @param object Object
 * @return void
 */
function modifyElement(param)
{
	if( typeof param['targetIDKey'] == 'number' )
	{
		var objTarget = document.getElementsByName(param['targetID'])[param['targetIDKey']];
	}
	else
	{
		var objTarget = document.getElementById(param['targetID']);
	}
	var mode = param['mode'];
	var value = param['val'];
	if( !value ) return;

	switch(mode)
	{
		default:
			break;
		case 'selectbox':
			for(var i = 0, t = objTarget.length; i < t; i++)
			{
				if( value == objTarget[i].value )
				{
					objTarget.selectedIndex = i;
					break;
				}
			}
			break;
	}
}

/**
 * 이벤트 핸들링 디버깅
 * @param String id
 * @param object oEvent
 * @return void
 */
function handleEvent(id, oEvent)
{
	var oTextbox = document.getElementById(id);
	if( oTextbox == null ) return;
	oTextbox.value += "\n>" + oEvent.type;
	oTextbox.value += "\n    target is " + (oEvent.target || oEvent.srcElement).id;
	oTextbox.value += "\n    keyCode is " + oEvent.keyCode;
	oTextbox.value += "\n    charCode is " + oEvent.charCode;

	var arrKeys = [];
	if (oEvent.shiftKey) {
		arrKeys.push("Shift");
	}

	if (oEvent.ctrlKey) {
		arrKeys.push("Ctrl");
	}

	if (oEvent.altKey) {
		arrKeys.push("Alt");
	}

	oTextbox.value += "\n    keys down are " + arrKeys;
}