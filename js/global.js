/**
 * @projectDescription ���� ���̺귯�� ����
 *
 * @author �ڳ��� nanhap@gmail.com
 * @version 1.0
 * @sdoc null
 * @date 2007-02-22 ���� 4:27
 */

// ���ڿ� ������Ÿ��
String.prototype.ltrim = new Function("return this.replace(/^\\s+/,'')"); // trim left
String.prototype.rtrim = new Function("return this.replace(/\\s+$/,'')"); // trim right
String.prototype.trim = new Function("return this.replace(/^\\s+|��|\\s+$/g,'')"); // trim both
String.prototype.strip = new Function("return this.replace(/^\s+/, '').replace(/\s+$/, '')");
String.prototype.number_format = function()
{
	return this.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1,');
}

// ���ڿ� �±�����
String.prototype.stripTag = function() {
	return this.replace(/<[^>]+>/g, '');
}
String.prototype.toArray = new Function("return this.split('')");

Array.prototype.each = function(iterator)
{
	for(var i = 0, length = this.length; i < length; i++)
		iterator(this[i]);
}

// �迭�� �˻��� ���� ������ �ε��� ��ȣ�� ����, ������ -1�� ����
Array.prototype.search = function(val)
{
	var len = this.length;
	for (var i = 0; i < len; i++)
	{
		if(this[i].trim() == val.trim()) return i;
	}

	return -1;
}

// �迭�� �� ��ҿ� ���� �Լ� ����
// ����, funcName �̶�� �Լ��� �ִٰ� �ϸ�, Array.walk(funcName)�� ���� ����Ѵ�.
// �Լ��� ù��° �����ڿ� ����, �ι�° �����ڿ� �ε����� ���޵ȴ�.
Array.prototype.walk = function(Func)
{
	var len = this.length;
	for (var i = 0; i<len; i++)
	{
		this[i] = Func(this[i], i);
	}
}

// �迭���� �����ϴ� ���ڸ� ��� ���Ѵ�.
Array.prototype.sum = function()
{
	var ret = 0;
	for (var i = 0; i<this.length; i++)
	{
		if((typeof this[i]).toLowerCase() == 'number') ret += this[i];
	}
	return ret;
}

// apply method ���
// �̺�Ʈ�߻��� �Լ��� �����Ҷ� Ŭ�������� this �� �����Ѵ�.
/*
Function.prototype.bind = function()
{
	var method = this;
	var args = [];
	for (var i = 0, length = arguments.length; i < length; i++)
		args.push(arguments[i]);
	var object = args.shift(); // ù��° ����
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
 * �迭�� n�� ���´�
	ex)
	var test = [1,2,3,4];
	test.shuffle(2);
	alert(test);
 * @param {Number} n ����Ƚ��
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
 * �����迭�� �� ������ key, value�� ����ϴ� �ݺ��Լ��� ����
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
    //���� �ν��Ͻ��� method , property
     for( K in this )
     {
         var key = K;
        // Array ������Ÿ�� method , property
         for( pK in Array.prototype ) if( K === pK ) key = null;
         if( key ) callback.call( null , K , this[ K ] );
     }
 }

/**
 * �迭 ������Ʈ���� ���� ū�� ���ϱ�
 * @param {Null}
 * @return {Number}
 * @author �ڳ��� nanhap@gmail.com
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
 * �迭 ������Ʈ���� ���� ������ ���ϱ�
 * @param {Null}
 * @return {Number}
 * @author �ڳ��� nanhap@gmail.com
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
 * @author �ڳ��� nanhap@gmail.com
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
 * ������Ʈ Ȯ��
 * @param {Object} destination
 * @param {Object} source
 * @return {Object}
 * @author �ڳ��� nanhap@gmail.com
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
 * �̺�Ʈ ���� ũ�ν�����¡
 * @param {Object} elm
 * @param {String} evType �̺�Ʈ Ÿ��
 * @return {Function} fn �Լ���
 * @author �ڳ��� nanhap@gmail.com
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
 * sprint �Լ� javascript version
 * @param {String} lang
 * @return {String}
 * @author �ڳ��� nanhap@gmail.com
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
 * @param {Number} num �ִ����
 * @return {Number}
 * @author �ڳ��� nanhap@gmail.com
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
 * üũ�ڽ� checked ����
 * ex)
	<input type="checkbox" name="chk[]"/>
	<input type="checkbox" name="chk[]"/>
	<input type="checkbox" name="chk[]"/>
	<input type="button" value="foo" onclick="checkbox({name:'chk[]'}); return false;" />
	<input type="button" value="foo" onclick="checkbox({name:'chk[]', mode:'check', msg:'����'}); return false;" />
 * @param {Object object} options {name:''[, mode: 'un or all or check or null']}
 * @return {Null}
 * @author �ڳ��� nanhap@gmail.com
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
 * ������Ʈ ���߱� ���̱�
 * @param {String} id
 * @return {Null}
 * @author �ڳ��� nanhap@gmail.com
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

// ��������
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

// ����� ��ȣ
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
			alert("����ڹ�ȣ�� �ùٸ��� �ʽ��ϴ�. �ٽ��Է��Ͽ� �ֽʽÿ�");
			return false;
		}
	}
	else
	{
		alert("����ڹ�ȣ�� �ùٸ��� �ʽ��ϴ�. �ٽ��Է��Ͽ� �ֽʽÿ�");
		return false;
	}
	if(Osub == LastVal)
	{
		return true;
	}
	else
	{
		alert("����ڹ�ȣ�� �ùٸ��� �ʽ��ϴ�. �ٽ��Է��Ͽ� �ֽʽÿ�");
		return false;
	}
}

// ����üũ
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

// �̸���üũ
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

// �ѱ�üũ
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

// ����üũ
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
 * �ֹι�ȣ üũ
	ssn.init(�ֹι�ȣ��13�ڸ�)
 * @param	juminno	 string	�ֹι�ȣ��13�ڸ�
 * @return	 boolen
 * @author	�ڳ���
 * @date	   2007-02-23 ���� 1:30
 **************************************************/
var ssn = {
	juminno: null,
	init: function(juminno)
	{
		this.juminno = juminno;
		if( this.juminno=="" || this.juminno==null )
		{
			alert("�ֹε�Ϲ�ȣ�� �����ֽʽÿ�.");
			return false;
		}
		var jumin1 = this.juminno.substr(0,6);
		var jumin2 = this.juminno.substr(6,7);
		var yy = jumin1.substr(0,2);		// �⵵
		var mm = jumin1.substr(2,2);		// ��
		var dd = jumin1.substr(4,2);		// ��
		var genda = jumin2.substr(0,1);		// ����
		var msg, ss, cc;

		// ���ڰ� �ƴ� ���� �Է��� ���
		if( this.isNumeric(jumin1) == false )
		{
			alert("�ֹε�Ϲ�ȣ ���ڸ��� ���ڷ� �Է��Ͻʽÿ�.");
			return false;
		}
		// ���̰� 6�� �ƴ� ���
		if( jumin1.length != 6 )
		{
			alert("�ֹε�Ϲ�ȣ ���ڸ��� �ٽ� �Է��Ͻʽÿ�.");
			return false;
		}
		// ù��° �ڷῡ�� ������(YYMMDD) ���� �� �⺻ ���� �˻�
		if(yy < "00" || yy > "99" ||
				mm < "01" || mm > "12" ||
				dd < "01" || dd > "31") {
				alert("�ֹε�Ϲ�ȣ ���ڸ��� �ٽ� �Է��Ͻʽÿ�.");
				return false;
		}
		// ���ڰ� �ƴ� ���� �Է��� ���
		if( this.isNumeric(jumin2) == false )
		{
			alert("�ֹε�Ϲ�ȣ ���ڸ��� ���ڷ� �Է��Ͻʽÿ�.");
			return false;
		}
		// ���̰� 7�� �ƴ� ���
		if( jumin2.length != 7 )
		{
			alert("�ֹε�Ϲ�ȣ ���ڸ��� �ٽ� �Է��Ͻʽÿ�.");
			return false;
		}
		// �����κ��� 1 ~ 4 �� �ƴ� ���
		if( genda < "1" || genda > "4" )
		{
			alert("�ֹε�Ϲ�ȣ ���ڸ��� �ٽ� �Է��Ͻʽÿ�.");
			return false;
		}
		// ���� ��� - 1 �Ǵ� 2: 1900���, 3 �Ǵ� 4: 2000���
		cc = (genda == "1" || genda == "2") ? "19" : "20";
		// ù��° �ڷῡ�� ������(YYMMDD) ���� �� ��¥ ���� �˻�
		if( this.isYYYYMMDD(parseInt(cc+yy), parseInt(mm), parseInt(dd)) == false )
		{
			alert("�ֹε�Ϲ�ȣ ���ڸ��� �ٽ� �Է��Ͻʽÿ�.");
			return false;
		}
		// Check Digit �˻�
		if( this.isSSN(jumin1, jumin2) == false )
		{
			alert("�Է��� �ֹε�Ϲ�ȣ�� ������ ��, �ٽ� �Է��Ͻʽÿ�.");
			return false;
		}
		return true;
	},

	isYYYYMMDD: function(y, m, d)
	{
		switch(m)
		{
			// 2���� ���
			case 2:
				if(d > 29) return false;
				// 2�� 29�� ��� ���ذ� ���������� Ȯ��
				if(d == 29)
				{
					if((y % 4 != 0) || (y % 100 == 0) && (y % 400 != 0)) return false;
				}
				break;
			// ���� ���� ���
			case 4:
			case 6:
			case 9:
			case 11:
				if(d == 31) return false;
			}
			// ū ���� ���
			return true;
	},

	// ����üũ
	isNumeric: function(s)
	{
		for(var i = 0; i<s.length; i++) {
				c = s.substr(i, 1);
				if(c < "0" || c > "9") return false;
		}
		return true;
	},

	// �ֹι�ȣ
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
 * ����Ʈ �ڽ� option �̵�

	<select id="s" size="8">
	<option value="1 �� �޴� �Դϴ�">1 �� �޴� �Դϴ�</option>
	<option value="2 �� �޴� �Դϴ�">2 �� �޴� �Դϴ�</option>
	<option value="3 �� �޴� �Դϴ�">3 �� �޴� �Դϴ�</option>
	<option value="4 �� �޴� �Դϴ�">4 �� �޴� �Դϴ�</option>
	<option value="5 �� �޴� �Դϴ�">5 �� �޴� �Դϴ�</option>
	<option value="6 �� �޴� �Դϴ�">6 �� �޴� �Դϴ�</option>
	</select>
	<div>
	<a href="javascript:menuMove('s','first')">ó��</a> |
	<a href="javascript:menuMove('s','up')">����</a> |
	<a href="javascript:menuMove('s','down')">�Ʒ���</a> |
	<a href="javascript:menuMove('s','last')">������</a>
	</div>

 * @param	id		  string	selectbox object
 * @param	mode	string	'first', 'last', 'up', 'down'
 * @return	 null
 * @date	   2007-02-23 ���� 5:55
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
 * @date	   2007-02-23 ���� 5:55
 */
function getNodeValue(obj,tag)
{
	return obj.getElementsByTagName(tag)[0].firstChild.nodeValue;
}

/**
 * ���̵�� ���� Ȥ�� �������������� �̷������ �ϸ� ���ڰ� ù° �ڸ��� �� �� �����ϴ�.
 * @param {String} field üũ�� ������Ʈ ���̵�
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
				alert('���� Ȥ�� �������������� �̷������ �ϸ�\r\n���ڰ� ù° �ڸ��� �� �� �����ϴ�.');
			o.focus();
			return theValue;
		}
	}

	return theValue;
}

/**
 * �빮�� üũ
 * @param {String} field üũ�� ������Ʈ ���̵�
 * @param {String} msg alert ���� ����
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
			if( msg == true ) alert("�빮�ڰ� ���ԵǾ��� �ֽ��ϴ�.");
			o.focus();
			return false;
		}
	}

	return true;
}

/**
 * ���������� ���� ����
 * @param {String} x object id
 * @return {Null}
 * @author �ڳ���
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
 * ��¥���� �Լ�
 * ex)
		var today = dt.today();
		this.g('year').value = today.y;
		this.g('month').value = today.m.replace('0', '');
		this.g('day').value = today.d.replace('0', '');

		var yesterday = dt.yesterday();
		this.g('year').value = yesterday.y;
		this.g('month').value = yesterday.m.replace('0', '');
		this.g('day').value = yesterday.d.replace('0', '');

		// ������
		dt.oneDayTS = dt.oneDayTS * 30;
		var yesterday = dt.yesterday();
		this.g('year').value = yesterday.y;
		this.g('month').value = yesterday.m.replace('0', '');

		// �̹���
		dt.oneDayTS = dt.oneDayTS * 30;
		var today = dt.today();
		this.g('year').value = today.y;
		this.g('month').value = today.m.replace('0', '');

 * @author �ڳ���
 * @date 2007-03-07
 *****************************************************************/
var dt = {
	todayDate: new Date(),
	oneDayTS: 24*60*60*1000,
	past: {},
	now: {},
	next: {},

	/**
	 * ���� Ÿ�ӽ�����
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
	 * ���� Ÿ�ӽ�����
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
	 * ���� Ÿ�ӽ�����
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
 * �ܺ� URL ���� �ƴ��� �Ǻ�
 * @param {Object} o
 * @return {Boolen}
 * @author �ڳ��� nanhap@gmail.com
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
 * ������?
 * @param {Null}
 * @return {String}
 * @author �ڳ��� nanhap@gmail.com
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
 * �˾�â ��� ����
 * @param {Object object} url ,name, w, h, opt
 * @return {Void}
 * @author �ڳ��� nanhap@gmail.com
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
 * ��ũ�� Y �� ��������
 * @param {Void}
 * @return {Array}
 * @author �ڳ���
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
 * ������ �ʺ� �� ��������
 * quirkmode.com ���� ^^
 * @param {Void}
 * @return {Array}
 * @author �ڳ��� nanhap@gmail.com
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

// ���� ���� ���
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

// ���� ���� ���
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
// row ���� ���󺯰� (by �ູ�Ѱ��)
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

// ���� ������ �ڵ� Ȯ���ϱ�
function confirmPage(type, url)
{
	// ���� �ּ��� ���
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
 * ������Ʈ ������
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
 * �̺�Ʈ �ڵ鸵 �����
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