/**************************************
 * ������������ �������� �� �����
 * stf ( submit to iframe )
 * ex1) usage post
		function foo()
		{
			stf.init({
				f: document.forms[0],
				method: 'post',
				action: 'http://localhost/Noname4.php',
				debug: true
			});
		}

	ex2) vld �� ����
		<script type="text/javascript">
			function foo()
			{
				stf.init({
					f: document.forms[0],
					method: 'post',
					action: 'http://localhost/Noname4.php',
					parameters: 'user_id=' + document.getElementById('user_id').value,
					mode: 'vld',
					debug: true,

					vldVar: {
						fm: document.forms[0],
						user_id: {
							msg: '���̵�'
						}
					}
				});
			}
		</script>

		<form method="post" action="">
			<input type="text" id="user_id" name="user_id" /><input type="button" value="foo" onclick="foo();" />
		</form>

 * @author    �ڳ���, ����ȯ
 * @date       2007-02-22 ���� 4:36
 *************************************/
var stf = {
	IE: document.all ? 1 : 0,
	setOptions: {
		method: 'post'
	},

	/**
	 * ���� Ÿ���� ����
	 * @param {Object object} options �ɼ��� �����Ѵ� JSON
	 * @return {Boolen} true / false
	 */
	init: function(options)
	{
		// set
		Object.extend(this.setOptions, options || '');

		// create iframe
		var frameObj = this.createPlace(this.setOptions['targetId'] || 'targetId');

		// switch method
		switch(this.setOptions.method)
		{
			case 'post':
				if( this.setOptions.mode == 'vld' )
				{
					this.setOptions.vldVar.target = this.setOptions.targetId || 'targetId';
					this.setOptions.vldVar.action = this.setOptions.action || '';
					vld.init(this.setOptions.vldVar);
				}
				else
				{
					this.setOptions.f.target = frameObj.id;
					this.setOptions.f.action = this.setOptions.action || '';
					this.setOptions.f.method = this.setOptions.method || '';
					this.setOptions.f.submit();
				}
				break;
			case 'get':
				var params = this.setOptions.parameters;
				if( params )
				{
					this.setOptions.action += (this.setOptions.action.indexOf('?') > -1 ? '&' : '?') + params;
				}

				// submit
				if( this.setOptions.mode == 'vld' )
				{
					this.setOptions.vldVar.target = this.setOptions.targetId || 'targetId';
					this.setOptions.vldVar.action = this.setOptions.action || '';
					this.setOptions.vldVar.method = this.setOptions.method || '';
					vld.init(this.setOptions.vldVar);
				}
				else
				{
					this.getRemote(frameObj, this.setOptions.action);
				}
				break;
		}
		return true;
	},

	/**
	 * create iframe
	 * @param {String} id object id
	 * @return {Obejct} ������ �������� ������Ʈ
	 */
	createPlace: function(id)
	{
		if( document.getElementById(id) == null )
		{
			if( window.document.all )
			{
				switch(this.setOptions.debug)
				{
					default:
						var o = document.createElement('<iframe id="'+ id +'" name="'+ id +'" style="display: block" width="0" height="0" frameborder="0" scrolling="auto"></iframe>');
						break;
					case true:
						var o = document.createElement('<iframe id="'+ id +'" name="'+ id +'" style="display: block" width="550" height="550" frameborder="1" scrolling="auto"></iframe>');
						break;
				}
			}
			else
			{
				var o = document.createElement('iframe');
				o.id = id;
				o.name = id;
				o.width = ( this.setOptions.debug == true ) ? '550px' : '0px';
				o.height = ( this.setOptions.debug == true ) ? '550px' : '0px';
				o.frameborder = ( this.setOptions.debug == true ) ? '1px' : '0px';
				o.scrolling = 'auto';
				o.marginheight = '0px';
				o.marginwidth = '0px';
				o.style.display = 'block';
			}

			if( document.getElementsByTagName('body')[0] )
				document.getElementsByTagName('body')[0].appendChild(o);
		}

		var frameObj = document.getElementById(id);
		if(typeof this.onCreate == 'function') this.onCreate(); // �����Լ� ����
		switch(this.IE)
		{
			case 1:
				frameObj.onreadystatechange = function()
				{
					if( frameObj.readyState == 'interactive' ) {}
					else if( frameObj.readyState == 'complete' ) {}
				}
				break;
			default:
				frameObj.onload = this.success.bind(this, id);
				break;
		}

		return frameObj;
	},

	/**
	 * sucess
	 * @param {String} id IframeObj id
	 */
	success: function(id)
	{
		if( typeof this.setOptions.onComplete == 'function' )
		{
			this.setOptions.onComplete(id);
		}
	},

	/**
	 * submit by get-method
	 * @param {Object} frameObj IframeObj
	 * @param {String} url
	 */
	getRemote: function(frameObj, url)
	{
		frameObj.src = url;
	},

	/**
	 * submit
	 * @return {Boolen}
	 */
	submit: function()
	{
		if( !this.fieldList )
		{
		var f = this.setOptions.f;
		f.action = this.setOptions.action;
		f.target = this.setOptions.targetId || 'targetId';
		f.submit();
		}

		// old version
		if( this.fieldList )
		{
			cf.fm = this.f;
			cf.action = this.action;
			cf.target = this.target_id;
			cf.fieldList = this.fieldList;
			cf.init();
		}
	}
}

var vld = {
	setOptions: {},
	continueObject: new Array('fm', 'target', 'action', 'method'),
	init: function(options)
	{
		// set
		Object.extend(this.setOptions, options || '');

		for( field in this.setOptions )
		{
			// check
			if( typeof field == null ) continue;
			if( this.continueObject.search(field) != -1 ) continue;

			// process
			if( this.check(field) == false ) return false;
		}

		switch(this.setOptions['mode'])
		{
			default:
				var f = this.setOptions.fm;
				f.method = this.setOptions.method || 'post';
				f.target = this.setOptions.target || '';
				f.action = this.setOptions.action || '';
				f.submit();
				break;
			// ajax mode �� ��� �� üũ�� �Ѵ�.
			case 'boolen':
			case 'ajax':
				return true;
				break;
		}

		return true;
	},

	/**
	 * check main process
	 * @param {String} field üũ�� ������Ʈ ���̵�
	 * @return {Boolen}
	 */
	check: function(field)
	{
		// set
		var optValue = this.setOptions[field]['type'];

		switch(typeof optValue)
		{
			case 'object':
				for(var i = 0; i < optValue.length; i++)
				{
					switch(optValue[i])
					{
						default:
							if( this.checkSwitch(field, optValue[i]) == false ) return false;
							break;
						// �ܺ� �Լ�
						case 'func':
							if( this.callFunc(field) == false ) return false;
							break;
						// ����ǥ����
						case 'match':
							if( this.checkMatch(field) == false ) return false;
							break;
					}
				}

				return true;
				break;
			case 'undefined':
			case 'string':
			default:
				return this.checkSwitch(field, optValue);
				break;
		}

		return true;
	},

	/**
	 * �ܺ� �Լ� ����
	 * @param {String} field id name
	 * @return {Boolen} true / fasle
	 */
	callFunc: function(field)
	{
		switch(typeof this.setOptions[field]['func'])
		{
			case 'function':
				return this.setOptions[field]['func'](field, true);
				break;
			case 'object':
			default:
				for(var j = 0; j < this.setOptions[field]['func'].length; j++)
				{
					if( this.setOptions[field]['func'][j](field, true) == false ) return false;
				}
				break;
		}

		return true;
	},

	/**
	 * ���к� üũ ��ƾ
	 * @param {String} field id name
	 * @param {String} optValue �ɼǰ�
	 * @return {Boolen} true / fasle
	 */
	checkSwitch: function(field, optValue)
	{
		// check case
		switch(optValue)
		{
			case 'length':
				return this.length(field);
				break;
			case 'email':
				return this.email(field);
				break;
			case 'digit':
				return this.digit(field);
				break;
			case 'radiobox':
			case 'checkbox':
				return this.box(field);
				break;
			case 'ssn':
				return this.ssn(field);
				break;
			case undefined:
			default:
				return this.checkDefault(field);
				break;
		}

		return true;
	},

	/**
	 * check default
	 * @param {String} field id name
	 * @return {Boolen}
	 */
	checkDefault: function(field)
	{
		// set
		var tarObj = document.getElementById(field);

		// process
		if( tarObj != null && tarObj.style.display != null && tarObj.style.display != 'none' && tarObj.parentNode.style.display != 'none' && tarObj.value == '' )
		{
			switch( tarObj.tagName )
			{
				case 'SELECT':
					var msg = printf('%s0��(��) �������ֽʽÿ�.', this.setOptions[field]['msg']);
					break;
				default:
					var msg = this.setOptions[field]['noSuffix'] ? printf('%s0', this.setOptions[field]['msg']): printf('%s0��(��) �Է����ֽʽÿ�.', this.setOptions[field]['msg']);
					break;
			}
			alert(msg);
			this.focus(tarObj);
			return false;
		}

		return true;
	},

	/**
	 * focus for object
	 * @param {Object} tarObj
	 * @return {Boolen}
	 */
	focus: function(tarObj)
	{
		switch(this.setOptions[field]['noSuffix'])
		{
			case true:
				return true;
				break;
			default:
				tarObj.focus();
				break;
		}
	},

	/**
	 * check for RexExp
	 * @param {String} field id name
	 * @return {Boolen}
	 */
	checkMatch: function(field)
	{
		// set
		var tarObj = document.getElementById(field);

		// process
		var str = eval('/' + this.setOptions[field]['match'] + '/');
		if( tarObj.value.match(str) != null )
		{
			alert(this.setOptions[field]['msgMatch']);
			tarObj.focus();
			return false;
		}

		return true;
	},

	/**
	 * check function length
	 * @param {String} field id name
	 * @return {Boolen} true / false
	 */
	length: function(field)
	{
		// set
		var tarObj = document.getElementById(field);

		// check default
		if( this.checkDefault(field) == false ) return false;

		// set
		var maxlength = this.setOptions[field]['maxlength'];
		var minlength = this.setOptions[field]['minlength'];
		if( typeof maxlength == 'undefined' || maxlength < 0 ) return false;
		if( typeof minlength == 'undefined' || minlength < 0 ) return false;

		// process
		if( tarObj.value.length < minlength || tarObj.value.length > maxlength )
		{
			var msg = printf('%s0�� ���̴� %s1~%s2 ���� ���ѵǾ� �ֽ��ϴ�.', this.setOptions[field]['msg'], minlength, maxlength);
			alert(msg);
			tarObj.focus();
			return false;
		}

		return true;
	},

	/**
	 * check email type
	 * @param {String} field id name
	 * @return {Boolen} true / false
	 */
	email: function(field)
	{
		// set
		var tarObj = document.getElementById(field);

		// check default
		if( this.checkDefault(field) == false ) return false;

		if( chkEmail(tarObj.value) == false )
		{
			var msg = printf('%s0������ �ùٸ��� �ʽ��ϴ�.', this.setOptions[field]['msg']);
			alert(msg);
			tarObj.focus();
			return false;
		}

		return true;
	},

	/**
	 * check number only
	 * @param {String} field id name
	 * @return {Boolen} true / false
	 */
	digit: function(field)
	{
		// set
		var tarObj = document.getElementById(field);

		// check default
		if( this.checkDefault(field) == false ) return false;

		if( chkNum(tarObj) == false )
		{
			var msg = printf('%s0 ������ �ùٸ��� �ʽ��ϴ�.', this.setOptions[field]['msg']);
			this.tarObj.focus();
			return false;
		}

		return true;
	},

	/**
	 * check for radiobox checkbox
	 * @param {String} field üũ or �����ڽ� name
	 * @return {Boolen} true / false
	 */
	box: function(field)
	{
		if( checkbox({name: field, mode: 'check'}) == false )
		{
			var msg = printf("%s0��(��) ������ �ֽʽÿ�.", this.setOptions[field]['msg']);
			alert(msg);
			return false;
		}

		return true;
	},

	/**
	 * check for jumin
	 * @param {String} field id name
	 * @param {Object} tarObj check object
	 * @return {Boolen} true / false
	 */
	ssn: function(field)
	{
		// set
		var f = this.setOptions.fm;
		var arr = field.split(',');
		var obj = eval('f.' + arr[0]);
		var obj2 = eval('f.' + arr[1]);

		// check default
		if( this.checkDefault(arr[0]) == false ) return false;
		if( this.checkDefault(arr[1]) == false ) return false;

		// process
		if( ssn.init( obj.value.toString() + obj2.value.toString() ) == false )
		{
			obj.focus();
			return false;
		}

		return true;
	}
}

/*************************************
 * create XMLHTTPRequest Object
 * xhr ( xml http request )
 * ex1) usage
	var o = xhr.init();
 * @author �ڳ���
 * @date 2007-02-22
 *************************************/
var xhr = {
	instance: false,
	init: function()
	{
		if( typeof XMLHttpRequest != 'undefined' )
		{
			this.instance = new XMLHttpRequest();
		}
		else
		{
			try
			{
				this.instance = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch(e)
			{
				try
				{
					this.instance = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch(e)
				{
					this.instance = false;
				}
			}
		}

		return this.instance;
	}
}

function Ajax2()
{
	this.Events = ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'], // readyState �� ���� �̺�Ʈ��
	this.setOptions = {
		method: 'post',
		asynchronous: true,
		contentType: 'application/x-www-form-urlencoded',
		encoding: 'UTF-8',
		parameters: ''
	}
}

Ajax2.prototype = {
	/**
	 * �����Լ�
	 * @param {String} url
	 * @param {Object object} options �ɼ� JSON
	 */
	init: function(url, options)
	{
		this.url = url;
		this.xhrObj = xhr.init();
		Object.extend(this.setOptions, options || {});
		this.request();
	},

	/**
	 * ��û
	 */
	request: function()
	{
		// when GET, append parameters to URL
		var params = this.setOptions.parameters;
		if( this.setOptions.method == 'get' && params )
		this.url += (this.url.indexOf('?') > -1 ? '&' : '?') + params;

		try {
			if(typeof this.setOptions.onCreate == 'function') this.setOptions.onCreate(); // �����Լ� ����
			this.xhrObj.open(this.setOptions.method, this.url, this.setOptions.asynchronous);
			this.xhrObj.onreadystatechange = this.onStateChange.bind(this);
			this.header();

			var body = this.setOptions.method == 'post' ? (this.setOptions.postBody || params) : null;
			this.xhrObj.send(body);

			/* Force Firefox to handle ready state for synchronous requests */
			if( !this.setOptions.asynchronous && this.xhrObj.overrideMimeType )
				this.onStateChange();
		}
		catch(e) {
			debug(e);
		}
	},

	/**
	 * �������
	 */
	header: function()
	{
		var headers = {
			'X-Requested-With': 'XMLHttpRequest',
			'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
		};

		if(this.setOptions.method == 'post')
		{
			headers['Content-Type'] = this.setOptions.contentType + ( this.setOptions.encoding ? '; charset=' + this.setOptions.encoding : '' );
		}
	
		for(var name in headers)
			this.xhrObj.setRequestHeader(name, headers[name]);
	},

	/**
	 * monitor
	 */
	onStateChange: function()
	{
		//if( this.xhrObj.readyState > 1 && !( this.xhrObj.readyState == 4 && this._complete ) )
		if( this.xhrObj.readyState > 1 )
			this.respond(this.xhrObj.readyState);
	},

	/**
	 * ��û �Ϸ�
	 */
	success: function() {
		return !this.xhrObj.status
		|| (this.xhrObj.status >= 200 && this.xhrObj.status < 300);
	},

	/**
	 * ��û���º� üũ
	 * @param {String} readyState
	 */
	respond: function(readyState)
	{
		var state = this.Events[readyState];

		if( state == 'Complete' )
		{
			this._complete = true;
			var json = this.evalJSON();
			if( typeof this.setOptions.onComplete == 'function' )
			{
				this.setOptions.onComplete(this.xhrObj, json);
			}
		}
	},

	/**
	 * ��û�� URL �� ���� �������
	 * @param {String} name ��� ���а�
	 * @return {Boolen} true/false
	 */
	getHeader: function(name) {
		try {
			return this.xhrObj.getResponseHeader(name);
		}
		catch(e) { debug(e); }

		return true;
	},

	/**
	 * JSON ���� ������
	 */
	// return json type
	evalJSON: function() {
		try {
		var json = this.getHeader('X-JSON');
		return json ? eval('(' + json + ')') : null;
		} catch (e) { return null }
	}
}

var Ajax = {
	Events: ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'], // readyState �� ���� �̺�Ʈ��
	setOptions: {
		method: 'post',
		asynchronous: true,
		contentType: 'application/x-www-form-urlencoded',
		encoding: 'UTF-8',
		parameters: ''
	}, // �⺻ �ɼ�

	/**
	 * �����Լ�
	 * @param {String} url
	 * @param {Object object} options �ɼ� JSON
	 */
	init: function(url, options)
	{
		this.url = url;
		this.xhrObj = xhr.init();
		Object.extend(this.setOptions, options || {});
		this.request();
	},

	/**
	 * ��û
	 */
	request: function()
	{
		// when GET, append parameters to URL
		var params = this.setOptions.parameters;
		if( this.setOptions.method == 'get' && params )
		this.url += (this.url.indexOf('?') > -1 ? '&' : '?') + params;

		try {
			if(typeof this.setOptions.onCreate == 'function') this.setOptions.onCreate(); // �����Լ� ����
			this.xhrObj.open(this.setOptions.method, this.url, this.setOptions.asynchronous);
			this.xhrObj.onreadystatechange = this.onStateChange.bind(this);
			this.header();

			var body = this.setOptions.method == 'post' ? (this.setOptions.postBody || params) : null;
			this.xhrObj.send(body);

			/* Force Firefox to handle ready state for synchronous requests */
			if( !this.setOptions.asynchronous && this.xhrObj.overrideMimeType )
				this.onStateChange();
		}
		catch(e) {
			debug(e);
		}
	},

	/**
	 * �������
	 */
	header: function()
	{
		var headers = {
			'X-Requested-With': 'XMLHttpRequest',
			'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
		};

		if(this.setOptions.method == 'post')
		{
			headers['Content-Type'] = this.setOptions.contentType + ( this.setOptions.encoding ? '; charset=' + this.setOptions.encoding : '' );
		}
	
		for(var name in headers)
			this.xhrObj.setRequestHeader(name, headers[name]);
	},

	/**
	 * monitor
	 */
	onStateChange: function()
	{
		//if( this.xhrObj.readyState > 1 && !( this.xhrObj.readyState == 4 && this._complete ) )
		if( this.xhrObj.readyState > 1 )
			this.respond(this.xhrObj.readyState);
	},

	/**
	 * ��û �Ϸ�
	 */
	success: function() {
		return !this.xhrObj.status
		|| (this.xhrObj.status >= 200 && this.xhrObj.status < 300);
	},

	/**
	 * ��û���º� üũ
	 * @param {String} readyState
	 */
	respond: function(readyState)
	{
		var state = this.Events[readyState];

		if( state == 'Complete' )
		{
			this._complete = true;
			var json = this.evalJSON();
			if( typeof this.setOptions.onComplete == 'function' )
			{
				this.setOptions.onComplete(this.xhrObj, json);
			}
		}
	},

	/**
	 * ��û�� URL �� ���� �������
	 * @param {String} name ��� ���а�
	 * @return {Boolen} true/false
	 */
	getHeader: function(name) {
		try {
			return this.xhrObj.getResponseHeader(name);
		}
		catch(e) { debug(e); }

		return true;
	},

	/**
	 * JSON ���� ������
	 */
	// return json type
	evalJSON: function() {
		try {
		var json = this.getHeader('X-JSON');
		return json ? eval('(' + json + ')') : null;
		} catch (e) { return null }
	}
}

/*************************************************************************************
 * ������ ��ũ TO ���̾�
 * opl ( open layer )
 * ex1) usage
	<div><a href="#" onclick="opl.open('http://wstatic.naver.com/w/n_c600.gif'); return false;">image</a></div>
	<div><a href="#" onclick="opl.open('http://cafe24.com'); return false;">homepage</a></div>

 * @author �ڳ���
 * @date 2006-12-27 ���� 5:43
 ************************************************************************************/
var opl = {
	IE: null
	, id_basic: '__layer__'
	, id_iframe: '__layer_iframe__'
	, id_back: '__layer_background__'
	, id_loading: '__layer_loading__'
	, isImg: false
	, imgClose: '/cimg/btn_close.gif'
	, imgLoad: '/images/ajax-loader.gif'
	, imgLoadX: 32
	, imgLoadY: 32
	, imgOverlay: '/images/overlay.png'
	, termWidth: 40 // ���̾� ���� ����
	, termHeight: 40 // ���̾� �ϴ� ����
	, iframeBorder: 5 // ���������� �׵θ� ����
	, iframeBorderColor: '#D4D0C8'
	, closeFlag: false
	,

	/**
	 * ���̾� ����
	 * @param String url
	 */
	open: function(url)
	{
		// check
		this.layerClose();

		// set
		this.url = url;
		this.setBasic(); // �⺻ ����
		this.setBack(); // ���̾� ��׶���
		this.loading(); // ���̾� �ε�
		this.set(); // ���̾� ������
		addEvent(window, 'resize', this.e.bind(this));
		if( this.IE == 1 ) addEvent(window, 'scroll', this.e.bind(this));

		switch(this.isImg)
		{
			// �̹���
			case true:
				this.createImg();
				break;
			// ����Ʈ
			default:
				this.openBridge();
				break;
		}
	},

	/**
	 * ���� ���� ����
	 * @param Void
	 * @return Void
	 */
	setBasic: function()
	{
		this.IE = getBrowserType() == 'msie' ? 1 : 0;
		this.size = getPageSize(); // global.js
		this.scrollBarWidth = this.IE == 1 ? 20 : 18;
		this.objBody = document.getElementsByTagName('body').item(0);
		this.width = this.size[2];
		this.height = this.size[3];
		this.scrollTop = this.IE == 1 ? getPageScroll() : 0; // global.js

		this.frameWidth = this.width - this.termWidth;
		this.frameHeight = this.height - this.termHeight;
		this.frameWidthB = this.width - this.termWidth + this.iframeBorder * 2;
		this.frameHeightB = this.height - this.termHeight + this.iframeBorder * 2;

		this.isImg = validateImg(this.url);
		if( this.isImg == true )
		{
			// set image object
			this.imgObj = new Image();
			this.imgObj.src = this.url;
			this.imgObjComplete = false;
		}
	},

	/**
	 * ��� ���̾� ���� �� ȭ�鿡 �߰�
	 * @param Void
	 * @return Void
	 */
	setBack: function()
	{
		this.objDivBack = document.createElement('div');
		this.objDivBack.setAttribute('id', this.id_back);
		this.objDivBack.style.width = this.width + 'px';
		this.objDivBack.style.height = this.height + 'px';
		this.objDivBack.style.position = this.IE ? 'absolute' : 'fixed';
		this.objDivBack.style.top = this.scrollTop + 'px';
		this.objDivBack.style.left = '0px';
		this.objDivBack.style.zIndex = 100000;
		this.objDivBack.style.cursor = 'pointer';
		addEvent(this.objDivBack, 'click', this.layerClose.bind(this));

		switch(this.IE)
		{
			case 1:
				this.objDivBack.style.backgroundColor = 'black';
				this.objDivBack.style.filter = "alpha(opacity=60)";
				break;
			default:
				this.objDivBack.style.backgroundImage = "url(" + this.imgOverlay + ")";
				this.objDivBack.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.imgOverlay + "', sizingMethod='scale')";
				break;
		}

		this.objBody.insertBefore(this.objDivBack, this.objBody.firstChild);
	},

	/**
	 * ���̾� �ݱ�
	 * @param Void
	 * @return Void
	 */
	layerClose: function()
	{
		var objLoadDiv = document.getElementById(this.id_loading);
		if( objLoadDiv ) document.body.removeChild(objLoadDiv);
		var objDiv = document.getElementById(this.id_basic);
		if( objDiv )
		{
			document.getElementById(this.id_iframe).src = '';
			objDiv.innerHTML = '';
			document.body.removeChild(objDiv);
		}

		var objDivBack = document.getElementById(this.id_back);
		if( objDivBack ) document.body.removeChild(objDivBack);

		// controll select box && flash
		this.controlBox();

		window.onscroll = null;
		window.onresize = null;
		this.isImg = null;
		this.opened = false;

		top.document.body.focus();
	},

	/**
	 * ����Ʈ �ڽ��� �÷��� �������� ����
	 * @param Void
	 * @return Void
	 */
	controlBox: function()
	{
		var o = document.getElementsByTagName('select');
		for( var i = 0; i < o.length; i++ )
		{
			if( o[i].style.visibility == 'hidden' ) o[i].style.visibility = 'visible';
			else o[i].style.visibility = 'hidden';
		}

		var flashObjects = document.getElementsByTagName("object");
		for (i = 0; i != flashObjects.length; i++) {
			if( flashObjects[i].style.visibility == 'hidden' ) flashObjects[i].style.visibility = 'visible';
			else flashObjects[i].style.visibility = 'hidden';
		}

		var flashEmbeds = document.getElementsByTagName("embed");
		for (i = 0; i != flashEmbeds.length; i++) {
			if( flashEmbeds[i].style.visibility == 'hidden' ) flashEmbeds[i].style.visibility = 'visible';
			else flashEmbeds[i].style.visibility = 'hidden';
		}
	},

	/**
	 * �ε��̹��� ���̾�
	 */
	loading: function()
	{
		this.objLoadDiv = document.createElement('div');
		this.objLoadDiv.id = this.id_loading;
		this.objLoadDiv.style.position = this.IE ? 'absolute' : 'fixed';
		this.objLoadDiv.style.top = ( this.scrollTop + this.height / 2 - this.imgLoadY / 2 ) + 'px';
		this.objLoadDiv.style.left = ( this.width / 2 - this.imgLoadX / 2 ) + 'px';
		this.objLoadDiv.style.zIndex = 101000;
		this.objLoadDiv.innerHTML = '<img src="' + this.imgLoad + '" />';
		this.objBody.insertBefore(this.objLoadDiv, this.objBody.firstChild);
	},

	/**
	 * ������ ���̾� ����
	 * @param Void
	 * @return Void
	 */
	set: function()
	{
		this.objDiv = document.createElement('div');
		this.objDiv.id = this.id_basic;
		this.objDiv.style.width = '0px';
		this.objDiv.style.height = '0px';
		this.objDiv.style.position = this.IE ? 'absolute' : 'fixed';
		this.objDiv.style.backgroundColor = '#FFF';
		this.objDiv.style.zIndex = 103000;
		this.objDiv.style.display = 'none';
		this.objDiv.innerHTML = '\<div id="close_bt_div" style="position: absolute; top: -22px; right: 0px;"><a href="#" onclick="opl.layerClose(); return false;"><img src="' + this.imgClose + '" alt="�ݱ�" border="0"/></a></div><iframe id="' + this.id_iframe + '" name="' + this.id_iframe + '" src="' + this.url + '"  frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="auto"></iframe>';

		this.objBody.insertBefore(this.objDiv, this.objBody.firstChild);

		var objIF = document.getElementById(this.id_iframe);
		objIF.style.overflowX = 'hidden';
	},

	/**
	 * ������ �̹��� ������Ʈ�κ��� width height ��������
	 * @param null
	 * @return Boolen
	 */
	createImg: function()
	{
		if( this.imgObj.complete == false )
		{
			var ret = setTimeout(this.createImg.bind(this), 100);
			return false;
		}

		this.imgObjComplete = this.imgObj.complete;
		this.imgObjWidth = this.imgObj.width;
		this.imgObjHeight = this.imgObj.height;
		this.imgObjWidthB = this.imgObj.width + this.iframeBorder * 2;
		this.imgObjHeightB = this.imgObj.height + this.iframeBorder * 2;

		this.imgPos();
		this.imgSize();

		return true;
	},

	/**
	 * controller size of image
	 * @param null
	 * @return void
	 */
	imgSize: function()
	{
		var o = document.getElementById(this.id_iframe);

		// check layer display
		if( document.getElementById('' + this.id_loading + '') == null ) return;
		document.getElementById('' + this.id_loading + '').style.display = 'none';
		document.getElementById('' + this.id_basic + '').style.display = 'block';

		// iframe X-size
		var tmp;
		if( this.width < this.imgObjWidth )
			o.style.width = this.frameRealWidth = this.frameWidth + 'px';
		else
		{
			o.style.width = this.frameRealWidth = this.imgObjWidth + 'px';
			tmp = true;
		}

		// iframe Y-size
		if( this.height < this.imgObjHeight )
		{
			o.style.height = this.frameRealHeight = this.frameHeight + 'px';
			if( tmp == true ) o.style.width = ( parseInt(o.style.width) + this.scrollBarWidth ) + 'px';
		}
		else
			o.style.height = this.frameRealHeight = this.imgObjHeight + 'px';

		// iframe border color
		this.frameBorder();

		// close flag
		this.closeFlag = true;
	},

	/**
	 * image position
	 */
	imgPos: function()
	{
		var o = document.getElementById(this.id_iframe);
		var x, y;
		if( this.imgObjWidthB >= this.width && this.imgObjHeightB >= this.height )
		{
			x = this.width / 2 - this.frameWidthB / 2;
			y = this.height / 2 - this.frameHeightB / 2;
		}
		else
		{
			if( this.imgObjWidthB >= this.width )
			{
				x = this.width / 2 - this.frameWidthB / 2;
				y = this.height / 2 - this.imgObjHeightB / 2;
			}
			else if( this.imgObjHeightB >= this.height )
			{
				x = this.width / 2 - this.imgObjWidthB / 2;
				y = this.height / 2 - this.frameHeightB / 2;
			}
			else
			{
				x = this.width / 2 - this.imgObjWidthB / 2;
				y = this.height / 2 - this.imgObjHeightB / 2;
			}
		}

		this.objDiv.style.left = x  + 'px';
		this.objDiv.style.top = ( this.scrollTop + y ) + 'px';
	},

	/**
	 * ������ ���������� ���������� �ε� �ܰ� ó��
	 * @param null
	 * @return void
	 */
	openBridge: function()
	{
		var o = document.getElementById(this.id_iframe);
		switch(this.IE)
		{
			case 1:
				o.onreadystatechange = this.openBridgeSub.bind(this, o);
				break;
			default:
				o.onload = this.createSite.bind(this, o);
				break;
		}
	},

	/**
	 * �ͽ����� ���������� ���»��� �Ϸ�Ǿ��� ��
	 * @param Object o
	 * @return Void
	 */
	openBridgeSub: function(o)
	{
		if( o.readyState == 'complete' )
		{
			this.createSite(o);
		}
	},

	/**
	 * controller size of iframe
	 * @param {Object} o iframe Object
	 */
	createSite: function(o)
	{
		// check layer display
		if( document.getElementById('' + this.id_basic + '') == null ) return;
		if( document.getElementById('' + this.id_loading + '') == null ) return;
		document.getElementById('' + this.id_loading + '').style.display = 'none';
		document.getElementById('' + this.id_basic + '').style.display = 'block';

		// size and position
		this.sitePos();
		this.siteSize();

		// close flag
		this.closeFlag = true;
	},

	/**
	 * �ܺ� URL ���� �ƴ��� �Ǻ�
	 * @param {Object} o
	 * @return {Boolen}
	 * @author �ڳ��� nanhap@gmail.com
	 * @date 2007-03-13
	 */
	chkOutUrl: function(o)
	{
		try {
			var ret = o.contentWindow.document.body.firstChild;
			return false;
		}
		catch(err)
		{
			return true;
		}
	},

	/**
	 * site size
	 */
	siteSize: function()
	{
		var o = document.getElementById(this.id_iframe);
		if( o == null ) return;
		if( this.chkOutUrl(o) == false )
		{
			ret = this._getPageSize(o.contentWindow);
			// iframe X-size
			if( this.width < ret[0] )
				o.style.width = this.frameRealWidth = this.frameWidth + 'px';
			else
			{
				o.style.width = this.frameRealWidth = ret[0] + 'px';
			}

			// iframe Y-size
			if( this.height < ret[1] )
			{
				o.style.height = this.frameRealHeight = this.frameHeight + 'px';
			}
			else
				o.style.height = this.frameRealHeight = ret[1] + 'px';
		}
		else
		{
			o.style.width = this.frameWidth + 'px';
			o.style.height = this.frameHeight + 'px';
		}

		// iframe border color
		this.frameBorder();
	},

	/**
	 * site position
	 */
	sitePos: function()
	{
		var o = document.getElementById(this.id_iframe);
		if( this.chkOutUrl(o) == false )
		{
			var x, y;
			var ret = this._getPageSize(o.contentWindow);
			if( ret[0] >= this.width && ret[1] >= this.height )
			{
				x = this.width / 2 - this.frameWidthB / 2;
				y = this.height / 2 - this.frameHeightB / 2;
			}
			else
			{
				if( ret[0] >= this.width )
				{
					x = this.width / 2 - this.frameWidthB / 2;
					y = this.height / 2 - ret[1] / 2;
				}
				else if( ret[1] >= this.height )
				{
					x = this.width / 2 - ret[0] / 2;
					y = this.height / 2 - this.frameHeightB / 2;
				}
				else
				{
					x = this.width / 2 - ret[0] / 2;
					y = this.height / 2 - ret[1] / 2;
				}
			}

			this.objDiv.style.left = x + 'px';
			this.objDiv.style.top = ( this.scrollTop + y ) + 'px';
		}
		else
		{
			x = this.width / 2 - this.frameWidthB / 2;
			y = this.height / 2 - this.frameHeightB / 2;
			this.objDiv.style.top = ( this.scrollTop + y ) + 'px';
			this.objDiv.style.left = x + 'px';
		}
	},

	/**
	 * iframe border color
	 */
	frameBorder: function()
	{
		var o = document.getElementById(this.id_iframe);
		var ob = document.getElementById('' + this.id_basic + '');
		ob.style.width = o.style.width;
		ob.style.height = o.style.height;
		ob.style.border = '' + this.iframeBorder + 'px solid ' + this.iframeBorderColor + '';
	},

	/**
	 * ���̾� ��ũ�� �� �������� �̺�Ʈ ó��
	 */
	e: function()
	{
		// check
		if( this.closeFlag == false ) return;

		// set
		this.setBasic();

		// background
		var objDivBack = document.getElementById(this.id_back);
		if( objDivBack )
		{
			this.setBasic();
			objDivBack.style.width = this.width + 'px';
			objDivBack.style.height = this.height + 'px';
			objDivBack.style.top = this.scrollTop + 'px';
			objDivBack.style.left = '0px';
		}

		// foreground
		if( this.isImg == true )
		{
			this.imgSize();
			this.imgPos();
		}
		else
		{
			this.siteSize();
			this.sitePos();
		}
	},

	/**
	 * data.class.php �� �̹��� Ȯ�뺸��� ����
	 * @param Number dtno Ȯ���� �̹����� ��ȣ
	 * @return void
	 */
	zoomPicture: function(dtno)
	{
		var contentsObj = parent.document.getElementById('' + this.id_basic + '');
		contentsObj.style.display = 'none';

		parent.opl.loading();
		var o = parent.document.getElementById(parent.opl.id_iframe);
		switch(parent.opl.IE)
		{
			case 1:
				break;
			default:
				o.style.width = '0px';
				o.style.height = '0px';
				break;
		}
		o.src = window.location.href + '&dtno=' + dtno;
		parent.opl.openBridge();
	},

	_getPageSize: function(o)
	{
		var xScroll, yScroll;
		if (o.document.documentElement.scrollHeight > o.document.documentElement.offsetHeight){ // all but Explorer Mac
			xScroll = o.document.documentElement.scrollWidth;
			yScroll = o.document.documentElement.scrollHeight;
		} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
			xScroll = o.document.documentElement.scrollWidth;
			yScroll = o.document.documentElement.offsetHeight;
		}

		var windowWidth, windowHeight;
		if (o.document.documentElement && o.document.documentElement.clientHeight) { // Explorer 6 Strict Mode
			windowWidth = o.document.documentElement.clientWidth;
			windowHeight = o.document.documentElement.clientHeight;
		} else if (o.document.body) { // other Explorers
			windowWidth = o.document.body.clientWidth;
			windowHeight = o.document.body.clientHeight;
		}
		// for small pages with total height less then height of the viewport
		if(yScroll < windowHeight){
			pageHeight = windowHeight;
		} else {
			pageHeight = yScroll;
		}
		if(xScroll < windowWidth){
			pageWidth = windowWidth;
		} else {
			pageWidth = xScroll;
		}
		arrayPageSize = new Array(pageWidth,pageHeight);
		if( typeof console != 'undefined' ) console.log(arrayPageSize);
		return arrayPageSize;
	}
}
/*********************************************************************************************
 * ǳ�� ����
 * ex1) �Ϲݻ���
	<a href="#" title="msg<br>�����ֻ�" onclick="balloon.open(event); return false;">[help]</a>

 * @author	�ڳ���
 * @date	   2007-01-12 ���� 5:04
 *********************************************************************************************/
var balloon = {
	curPop: false,
	xOffset: 10,
	yOffset: 0,
	newLeft: null,
	newTop: null,
	targetObjId: null,
	styleObject: null,
	eventObj: null,
	msgObj: {},
	targetObjId: 'balloonID',

	/**
	 * ����
	 * @param {Object} eventObj �̺�Ʈ ������Ʈ
	 */
	set: function(eventObj)
	{
		// create msg layer
		this.msgObj[this.targetObjId] = document.createElement('div');
		this.msgObj[this.targetObjId].id = this.targetObjId;
		this.msgObj[this.targetObjId].style.position = 'absolute';
		this.msgObj[this.targetObjId].style.display = 'none';
		this.msgObj[this.targetObjId].style.backgroundColor = 'white';
		this.msgObj[this.targetObjId].style.width = '';
		this.msgObj[this.targetObjId].style.borderLeft = '1px solid black';
		this.msgObj[this.targetObjId].style.borderTop = '1px solid black';
		this.msgObj[this.targetObjId].style.borderBottom = '3px solid black';
		this.msgObj[this.targetObjId].style.borderRight = '3px solid black';
		this.msgObj[this.targetObjId].style.padding = '3px';
		this.msgObj[this.targetObjId].style.zIndex = 1000;
		this.msgObj[this.targetObjId].style.fontSize = '9pt';
		this.msgObj[this.targetObjId].innerHTML = eventObj.currentTarget ? eventObj.currentTarget.getAttribute('msg') : eventObj.srcElement.getAttribute('msg');
		this.styleObject = this.msgObj[this.targetObjId].style;
		this.eventObj = eventObj;
		this.msgObj[this.targetObjId].style.left = ( this.eventObj.pageX ? this.eventObj.pageX + this.xOffset : this.eventObj.clientX + this.xOffset + document.documentElement.scrollLeft ) + 'px';
		this.msgObj[this.targetObjId].style.top = ( this.eventObj.pageY ? this.eventObj.pageY + this.yOffset : this.eventObj.clientY + this.yOffset + ( document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop ) ) + 'px';

		// set event
		this.msgObj[this.targetObjId].onmouseout = this.close.bind(this);

		// append
		this.objBody = document.getElementsByTagName('body').item(0)
		this.objBody.insertBefore(this.msgObj[this.targetObjId], this.objBody.firstChild);
	},

	/**
	 * open
	 * @param {Object} eventObj �̺�Ʈ ������Ʈ
	 */
	open: function(eventObj)
	{
		// check
		if( !eventObj ) var eventObj = window.event;
		this.close();

		// set
		this.set(eventObj);

		// process
		this.change('block');
	},

	/**
	 * close
	 */
	close: function()
	{
		if( this.curPop )
		{
			this.change('none');
			this.curPop = false;
		}
	},

	/**
	 * change style display
	 * @param {String} vi style.display �Ӽ��� none/block
	 * @return {Boolen} true/false
	 */
	change: function(vi)
	{
		if( this.styleObject )
		{
			this.styleObject.display = vi;
			this.curPop = this.targetObjId;
			return true;
		}
		else
		   return false;
	}
}

var cf = {
	fm: null,
	action: null,
	target: null,
	fieldList: [],

	chk: function()
	{
		// declare
		var obj = eval('this.fm.' + this.fieldList[this.i][0]);
		var tmp = false;

		// process
		if( obj )
		{
			if( this.isArray(obj) == true )
			{
				for(var j = 0; j < obj.length; j++)
				{
					if(obj[j].checked == true)
					{
						var tmp = true;
					}
				}

				if(tmp == false)
				{
					var msg = printf("%s0��(��) ������ �ֽʽÿ�.", this.fieldList[this.i][1]);
					alert(msg);
					return false;
				}
			}
			else
			{
				if(obj.checked == false)
				{
					var msg = printf("%s0��(��) ������ �ֽʽÿ�.", this.fieldList[this.i][1]);
					alert(msg);
					return false;
				}
			}
		}

		return true;
	},

	isArray: function(obj)
	{
		if( typeof obj.length == 'undefined' )
		{
			return false;
		}
		else
		{
			return true;
		}
	},

	chkarr: function()
	{
		// declare
		var obj = document.getElementsByName(this.fieldList[this.i][0]);
		var tmp = false;

		// process
		if( obj )
		{
			for(var j = 0; j < obj.length; j++)
			{
				if(obj[j].checked == true)
				{
					var tmp = true;
				}
			}

			if(tmp == false)
			{
				var msg = printf("%s0��(��) ������ �ֽʽÿ�.", this.fieldList[this.i][1]);
				alert(msg);
				return false;
			}
		}

		return true;
	},

	arr: function()
	{
		// declare
		var obj = document.getElementsByName(this.fieldList[this.i][0]);

		// process
		if( obj )
		{
			for(var j = 0; j < obj.length; j++)
			{
				if( obj[j].value == '' )
				{
					var msg = printf("%s0��(��) �Է��� �ֽʽÿ�.", this.fieldList[this.i][1]);
					alert(msg);
					return false;
				}
			}
		}

		return true;
	},

	pop: function()
	{
		// declare
		var obj = eval('this.fm.' + this.fieldList[this.i][0]);

		// process
		if( obj )
		{
			if( obj.style.display != 'none' && obj.parentNode.style.display != 'none' && obj.value == '' )
			{
				switch (obj.tagName)
				{
					case 'SELECT' : var msg = printf("%s0��(��) ������ �ֽʽÿ�.", this.fieldList[this.i][1]); break;
					default : var msg = printf("%s0��(��) �Է��� �ֽʽÿ�.", this.fieldList[this.i][1]); break;
				}
				alert(msg);
				return false;
			}
		}

		return true;
	},

	email_: function()
	{
		// declare
		var obj = eval('this.fm.' + this.fieldList[this.i][0]);

		// process
		if( obj )
		{
			if( chkEmail( obj.value ) == false )
			{
				var msg = printf("%s0��(��) �̸��� ���Ŀ� ���� �ʽ��ϴ�.", this.fieldList[this.i][1]);
				alert(msg);
				obj.focus();
				return false;
			}
		}

		return true;
	},

	num_: function()
	{
		// declare
		var obj = eval('this.fm.' + this.fieldList[this.i][0]);

		// process
		if( obj )
		{
			if( chkNum( obj ) == false )
			{
				var msg = printf("%s0��(��) ���� ���Ŀ� ���� �ʽ��ϴ�.", this.fieldList[this.i][1]);
				alert(msg);
				obj.focus();
				return false;
			}
		}

		return true;
	},

	ssn: function()
	{
		// declare
		var arr = this.fieldList[this.i][0].split('|');
		var obj = eval('this.fm.' + arr[0]);
		var obj2 = eval('this.fm.' + arr[1]);

		// process
		if( obj && obj2 )
		{
			if( ssn.init( obj.value.toString() + obj2.value.toString() ) == false )
			{
				//var msg = printf("%s0��(��) ���Ŀ� ���� �ʽ��ϴ�.", this.fieldList[this.i][1]);
				//alert(msg);
				obj.focus();
				return false;
			}
		}

		return true;
	},

	length_: function()
	{
		// declare
		var obj = eval('this.fm.' + this.fieldList[this.i][0]);

		// process
		if( obj )
		{
			if( obj.value.length > this.fieldList[this.i][3] )
			{
				var msg = printf("���̰� %s0 ���Ϸ� ���ѵǾ� �ֽ��ϴ�.", this.fieldList[this.i][3]);
				alert(msg);
				obj.focus();
				return false;
			}
		}

		return true;
	},

	def: function()
	{
		// declare
		var obj = eval('this.fm.' + this.fieldList[this.i][0]);

		// process
		if( obj )
		{
			if( obj.style.display != 'none' && obj.parentNode.style.display != 'none' && obj.value == '' )
			{
				switch(obj.tagName)
				{
					case 'SELECT' : var msg = printf("%s0��(��) ������ �ֽʽÿ�.", this.fieldList[this.i][1]); break;
					default : var msg = printf("%s0��(��) �Է��� �ֽʽÿ�.", this.fieldList[this.i][1]); break;
				}

				alert(msg);
				obj.focus();
				return false;
			}
		}

		return true;
	},

	// switching check
	init: function()
	{
		for(var i = 0; i < this.fieldList.length; i++)
		{
			this.i = i;
			switch(this.fieldList[this.i][2])
			{
				case 'chk' : if( this.chk() == false) return; break;
				case 'chkarr' : if( this.chkarr() == false) return; break;
				case 'arr' : if( this.arr() == false ) return; break;
				case 'pop' : if( this.pop() == false ) return; break;
				case 'email' : if( this.email_() == false ) return; break;
				case 'num' : if( this.num_() == false ) return; break;
				case 'length' : if( this.length_() == false ) return; break;
				case 'ssn' : if( this.ssn() == false ) return; break;
				default : if( this.def() == false ) return; break;
			}
		}

		switch(this.mode)
		{
			default:
				if( this.action ) this.fm.action = this.action;
				this.fm.target = this.target;
				this.fm.submit();
				break;
			// ajax mode �� ��� �� üũ�� �Ѵ�.
			case 'ajax':
				break;
		}
	}
}

/************************************************************************************************************
 * ��Ű
 * ex1) usage
	<body onload = "ck.view()">
	<div>��Ű ����</div>
	<div>
	��Ű�� : <input type="text" name="setname" id="setname"><br />
	��Ű�� : <input type="text" name="setvalue" id="setvalue"><br />
	���� : <input type="text" name="expire" id="expire"><br />
	<input type="button" onclick="ck.setMy(document.getElementById('setname').value,
	document.getElementById('setvalue').value, document.getElementById('expire').value);" value="��Ű����" />
	</div>

	<div>��Ű Ȯ��</div>
	<div>
	��Ű�� : <input type="text" name="getname" id="getname" /><br />
	<input type="button" onclick="ck.getMy(document.getElementById('getname').value)" value="��ŰȮ��" />
	</div>

	<div>��Ű ����</div>
	<div>
	��Ű�� : <input type="text" name="deletename" id="deletename" /><br />
	<input type="button" onclick="ck.delMy(document.getElementById('deletename').value)" value="��Ű����" />
	</div>

	<div>��ü ��Ű</div>
	<div id="cookieOut"><span/></div>

 * @author	�ڳ���
 * @date	   2007-02-23 ���� 1:29
 **************************************************************************************************************/
var ck = {
	/**
	 * ��Ű ���
	 * @param cookieName string ��Ű��
	 */
	get: function(cookieName)
	{
		var search = cookieName + "=";
		var cookie = document.cookie;
		var chk = false;

		if( cookie.length > 0 )
		{
			// check
			var arr = cookie.split(';');
			for( var i = 0; i < arr.length; i++ )
			{
				var arrSub = arr[i].split('=');
				if( arrSub.search(cookieName) != -1 )
				{
					var chk = true;
					var value = arrSub[1];
					break;
				}
			}

			if( chk == false ) return false;
			else
			{
				// process
				return unescape(value);
			}
		}
		else
		{
			return false;
		}
	 },

	/**
	 * ��Ű ����
	 * @param cookieName string ��Ű��
	 * @param cookieValue string ��Ű��
	 * @param expireDay integer ��Ű ��ȿ��¥
	 */
	set: function(cookieName, cookieValue, expireDate)
	{
		var today = new Date();
		today.setDate( today.getDate() + parseInt( expireDate ) );
		document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/; expires=" + today.toGMTString() + ";"
	},

	/**
	 * ��Ű ����
	 * @param cookieName string ������ ��Ű��
	*/
	del: function(cookieName)
	{
		var expireDate = new Date();

		expireDate.setDate( expireDate.getDate() - 1 );
		document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
	},

	/**
	 * �ڽ��� ������ ������ ��Ű ����
	 * @param cookieName string ��Ű��
	 * @param cookieValue string ��Ű��
	 * @param expireDay integer ��Ű ��ȿ��¥
	 */
	setMy: function(cookieName, cookieValue, expireDate)
	{
		this.set(cookieName, cookieValue, expireDate);
		this.view(); // ��ü ��Ű ��� ����
	},

	/**
	 * �ڽ��� ������ ��Ű������ Ȯ��
	 * @param cookieName string ��Ű��
	 */
	getMy: function(cookieName)
	{
		alert( "��Ű �� : " + this.get(cookieName) );
	},

	/**
	 * �ڽ��� ������ ��Ű������ ��Ű ����
	 * @param cookieName string ��Ű��
	 */
	delMy: function(cookieName)
	{
		this.del(cookieName);
		alert("��Ű�� �����Ǿ����ϴ�.");
		this.view();
	},

	/**
	* ��ü ��Ű ���
	*/
	view: function()
	{
		var o = document.getElementById('cookieOut');
		if( o == null ) return;
		if( document.cookie.length > 0 )
			o.innerHTML = document.cookie;
		else
			o.innerHTML = '����� ��Ű�� �����ϴ�.';
	}
}

/****************************************************************
 * �˾� ����
 * ex1) usage
  - ��â
	 popup.init(url, ���ν�����, ���ν�����, â�ɼ�, ��Ű��, â����);
	 // popup.init('a.html', 487, 600, '', 'cookiename', 'modal');
  - �˾�â
	window.onload = function()
	{
		Object.extend(popup, {mode: 'modal', cookieName: 'default'});
	}
	�ݴ� üũ�ڽ� �̺�Ʈ:  onclick="popup.close();"
	��â ��ũ ������: onclick="popup.link(val);"

 * @author �ڳ���
 * @date 2007-01-12 ���� 3:35
 ***************************************************************/
var popup = {
	debug: false,
	url: null,
	size: {},
	pos: {},
	type: {1: 'window', 2: 'layer', 3: 'modal'},
	opt: null, cookieName: null, mode: null,
	IE: document.all ? 1 : 0,

	// open
	init: function(url, x, y, opt, cookieName, mode)
	{
		// set
		this.set(url, x, y, opt, cookieName, mode);

		// if
		switch(this.mode)
		{
			case 'window':

				break;
			case 'layer':

				break;
			case 'modal':
				if( this.IE == false ) return;
				if( ck.get('' + this.cookieName + '') != 1 )
					window.showModelessDialog(this.url, window, this.opt);
				break;
		}
	},

	// set
	set: function(url, x, y, opt, cookieName, mode)
	{
		// set
		this.url = url;
		this.size['popupSizeX'] = x;
		this.size['popupSizeY'] = y;
		this.opt = opt;
		this.cookieName = cookieName == '' ? '_cookieName' : cookieName;
		this.mode = mode == '' ? 'window' : mode;

		// if
		switch(this.mode)
		{
			case 'window':

				break;
			case 'layer':

				break;
			case 'modal':
				this.pos['popupLeft'] = screen.width / 2 - this.size['popupSizeX'] / 2;
				this.pos['popupTop'] = screen.height / 2 - this.size['popupSizeY'] / 2;
				this.opt = 'dialogLeft: ' + this.pos['popupLeft'] + 'px; dialogTop: ' + this.pos['popupTop'] + 'px;';
				this.opt += 'dialogWidth: ' + this.size['popupSizeX'] + 'px; dialogHeight: ' + this.size['popupSizeY'] + 'px; scroll: no; center: 1';
				break;
		}

		// debug
		debug(this);
	},

	// close
	close: function()
	{
		// check
		if( this.cookieName == null )
		{
			alert('popup[\'cookieName\'] ���� �����Ͽ� �ֽʽÿ�.');
			return;
		}

		 if( document.getElementById('close').checked == true )
			ck.set( this.cookieName, 1, 1);

		 self.close();
	},

	// link
	link: function(val)
	{
		// check
		if( this.mode == null )
		{
			alert('popup[\'mode\'] ���� �����Ͽ� �ֽʽÿ�.');
			return;
		}

		// if
		switch(this.mode)
		{
			case 'window':

				break;
			case 'layer':

				break;
			case 'modal':
				if( window.dialogArguments && dialogArguments.location )
				{
					//window.dialogArguments.top.blog_frame.location.href = val;
					window.dialogArguments.location.replace(val);
					window.close();
				}
				break;
		}
	},

	// move
	move: function()
	{
	}
}

/****************************************************************
 * ��� ��ũ��
 * sb ( scroll banner )
 * ex1) usage
	<div style="height: 1000px;">
		<div id="menu" style="position: relative;">��ũ�� ���� ���</div>
		<script type="text/javascript">
			sb.init('menu');
		</script>
	</div>

 * @author	�ڳ���
 * @date	   2007-02-22 ���� 5:17
 ****************************************************************/
var sb = {
	divObj: Object,
	base: -200,
	gap: 0,
	top: 0,
	left: 20,
	bttm: 160,
	activateSpeed: 100,
	scrollSpeed: 2,
	timer: null,
	bMove: 1,
	startPoint: 0,
	endPoint: 0,
	refreshTimer: 0,

	/**
	 * initialize
	 * @param {String} field Object ID
	 * @return {Null} 
	 */
	init: function(field)
	{
		this.divObj = document.getElementById(field);
		this.divObj.style.display = 'block';
		if( this.base == -200 ) this.base = this.top;
		this.divObj.style.top = this.base;

		this.refresh();
	},

	refresh: function()
	{
		if( !this.bMove ) return;

		// set
		this.startPoint = parseInt(this.divObj.style.top, 10);
		this.endPoint = document.documentElement.scrollTop == 0 ? document.body.scrollTop + this.gap : document.documentElement.scrollTop + this.gap;
		if( this.endPoint < this.base ) this.endPoint = this.base;
		this.refreshTimer = this.activateSpeed;

		// process
		if( this.startPoint != this.endPoint &&
			this.endPoint <= ( document.body.scrollHeight - this.bttm) )
		{
			var scrollAmount = Math.ceil( Math.abs( this.endPoint - this.startPoint ) / 15 );
			var top = parseInt(this.divObj.style.top, 10) + (( this.endPoint < this.startPoint ) ? -scrollAmount : scrollAmount);

			this.divObj.style.top = top + 'px';
			this.refreshTimer = this.scrollSpeed;
		}
		this.timer = setTimeout("sb.refresh();", this.refreshTimer);
	}
}

/**
 * ��Ʈ �׷����ֱ�
 * gs ( graph scroll )
 * ex1) usage
	<script type="text/javascript">
	addEvent(window, 'load', function()
	{
		gs.init({
			amount: 1, // �׷��� �׷����� ����
			speed: 10, // �׷��� �׷����� �ӵ�
			data: new Array(100, 50, 30), // ����Ÿ
			commentData: [], // �ڸ�Ʈ
			dateSearchTypeID: 'd', // ��ȸŸ�� id ��
			create: {
				id: 'graph-container',
				comment_id: 'comment-container',
				topPos: '100px', // ������ ��ġ���� top position
				color: 'red' // �ְ����
			}
		});
	});
	</script>
	<style type="text/css" title="currentStyle" media="screen">
		#graph-container {
			position:relative;
			height: 100px;
			border: 1px solid black;
			overflow: hidden;
		}
		#comment-container {
			position:relative;
			height: 10px;
		}
	</style>
	<p>
	abcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd
	abcdabcdabcdabcd
	</p>
	<div id="graph-container"></div>
	<div id="comment-container"></div>
	<p>
	abcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd
	abcdabcdabcdabcd
	</p>
 * @author �ڳ���
 * @date 2007-03-23
 */
var gs = {
	setOptions: {},

	/**
	 * �����Լ�
	 * @param {Object object} options �ɼ� JSON
	 */
	init: function(options)
	{
		// set
		Object.extend(this.setOptions, options || '');
		this.setOptions.create.width = document.body.offsetWidth / this.setOptions.data.length;
		this.setOptions.dateSearchType = checkbox({name: this.setOptions.dateSearchTypeID, mode: 'val'});

		// check
		if( this.setOptions.data.length == 0 )
		{
			//alert('data ���� �������ּ���');
			return;
		}
		var objSource = document.getElementById(this.setOptions.create.id);
		var objCommentSource = document.getElementById(this.setOptions.create.comment_id);
		if( objSource == null )
		{
			alert(this.setOptions.create.id + ' ������ div ������Ʈ�� �����ϼ���');
			return;
		}
		if( objCommentSource == null )
		{
			alert(this.setOptions.create.comment_id + ' ������ div ������Ʈ�� �����ϼ���');
			return;
		}

		// process
		for(var i = 0; i < this.setOptions.data.length; i++)
		{
			// set
			var data = this.setOptions.data[i];
			var data2 = this.setOptions.data2[i];
			data_format = data / this.setOptions.data.sum() * 99;
			data2_format = data2 / this.setOptions.data2.sum() * 99;
			//debug(data_format);

			// create
			var o = this.createDesti(i, data_format, data);
			var o2 = this.createDesti2(i, data2_format, data2);
			if( o == null ) continue;
			objSource.appendChild(o);
			objSource.appendChild(o2);
			objCommentSource.appendChild( this.createDestiCom(i, data_format) );

			// action
			if( parseInt(o.style.height) < data_format )
			{
				this.draw(o, data_format, {top: ''});
			}

			if( parseInt(o2.style.height) < data2_format )
			{
				this.draw(o2, data2_format, {top: '0px'});
			}
		}
	},

	/**
	 * ��Ʈ ������Ʈ ����
	 * @param {Number} num ������
	 * @param {Number} data ����Ÿ��
	 * @param {Number} data ���� ����Ÿ��
	 * @return {Object} 
	 * @author �ڳ���
	 * @date 2007-03-26
	 */
	createDesti: function(num, data, data_ori)
	{
		var o = document.createElement('div');
		o.id = 'chart' + num;
		o.style.position = 'absolute';
		o.style.top = this.setOptions.create.topPos || '200px';
		o.style.left = num == 0 ? num + 'px' : ( num * this.setOptions.create.width ) + 'px';
		o.style.width = ( this.setOptions.create.width * 0.9 ) + 'px';
		o.style.height = '0px';
		o.style.border = '1px solid #000066';
		o.style.zIndex = 1;
		o.style.display = data != 0 ? 'block' : 'none';

		var color;
		if( this.setOptions.data.max() == data_ori )
			color = this.setOptions.create.color;
		else
			color = '#0066CC';
		o.style.backgroundColor = color;

		return o;
	},

	/**
	 * ��Ʈ ������Ʈ ����
	 * @param {Number} num ������
	 * @param {Number} data ����Ÿ��
	 * @param {Number} data ���� ����Ÿ��
	 * @return {Object} 
	 * @author �ڳ���
	 * @date 2007-03-26
	 */
	createDesti2: function(num, data, data_ori)
	{
		var o = document.createElement('div');
		o.id = 'chart' + num;
		o.style.position = 'absolute';
		o.style.top = this.setOptions.create.topPos || '200px';
		o.style.left = num == 0 ? num + 'px' : ( num * this.setOptions.create.width + (this.setOptions.create.width / 3) ) + 'px';
		o.style.width = ( this.setOptions.create.width * 0.85 ) + 'px';
		o.style.height = '0px';
		o.style.border = '1px solid #000066';
		o.style.filter = 'alpha(opacity=50)';
		o.style.zIndex = 2;
		o.style.display = data != 0 ? 'block' : 'none';

		var color;
		if( this.setOptions.data2.max() == data_ori )
			color = this.setOptions.create.color2;
		else
			color = '#99CCFF'
		o.style.backgroundColor = color;

		return o;
	},

	/**
	 * ��Ʈ �ڸ�Ʈ ������Ʈ ����
	 * @param {Number} num ������
	 * @param {Number} data ����Ÿ��
	 * @return {Object} 
	 * @author �ڳ���
	 * @date 2007-03-26
	 */
	createDestiCom: function(num, data)
	{
		var o = document.createElement('div');
		o.id = 'chart_comment_' + num;
		o.style.position = 'absolute';
		o.style.top = '3px';
		o.style.left = num == 0 ? num + 'px' : ( num * this.setOptions.create.width ) + 'px';
		o.style.width = ( this.setOptions.create.width * 0.9 ) + 'px';
		o.style.height = '0px';
		o.style.zIndex = 1;
		o.style.fontSize = '7.5pt';
		o.style.textAlign = 'center';
		if( this.setOptions.commentData.length > 1 )
		{
			o.innerHTML = this.setOptions.commentData[num];
		}
		else
		{
			if( typeof this.setOptions.dateSearchTypeID == 'undefined' )
			{
				o.innerHTML = num;
			}
			else
			{
				o.innerHTML = this.setOptions.dateSearchType == 1 ? num : num + 1;
			}
		}

		return o;
	},

	/**
	 * ���μ���
	 * @param {Object} obj
	 * @param {Number} limit
	 * @return {Void} 
	 * @author �ڳ���
	 * @date 2007-03-23
	 */
	draw: function(obj, limit, opt)
	{
		if( parseInt(obj.style.height) <= limit )
		{
			obj.style.top = (parseInt(obj.style.top) - this.setOptions.amount || 5) + 'px';
			obj.style.height = (parseInt(obj.style.height) + this.setOptions.amount || 5) + 'px';

			// ��ġ ǥ��
			this.val(obj, opt);

			// ������
			setTimeout(this.draw.bind(this, obj, limit, opt), this.setOptions.speed || 50); 
		}
	},

	/**
	 * �׷��� ��ġ ǥ��
	 * @param {Object} obj
	 * @return {Void}
	 * @author �ڳ��� nanhap@gmail.com
	 * @date 2007-03-27
	 */
	val: function(obj, opt)
	{
		// check
		if( obj.childNodes.length > 0 ) obj.removeChild(obj.childNodes.item(0));

		// process
		var _obj = document.createElement('div');
		_obj.id = '_' + obj.id;
		_obj.style.position = 'absolute';
		_obj.style.top = opt.top ? opt.top : '-11px';
		_obj.style.left = '0px';
		_obj.style.width = '100%';
		_obj.style.padding = '0px';
		_obj.style.margin = '0px';
		_obj.style.fontSize = '8pt';
		_obj.style.color = 'black';
		_obj.style.textAlign = 'center';
		_obj.style.letterSpacing = '0px';
		_obj.innerHTML = parseInt(obj.style.height) + '%';
		obj.appendChild(_obj);
	}
}


/**
 * �̹��ְ���¥
 * date.js �ʼ�
 * @param Date regdate - yyyy-MM-dd
 * @return Object object
 * @author �ڳ��� nanhap@gmail.com
 * @date 2007-12-14
 */
function getThisWeek(regdate)
{
	if( typeof regdate == 'undefined' )
	{
		d1 = Date.today();
	}
	else
	{
		val = regdate;
		year = val.substring(0,4);
		month = val.substring(5,7) - 1;
		day = val.substring(8,10);
		d1 = Date.today().set({ year: parseInt(year), month: parseInt(month), day: parseInt(day) });
	}

	var d2 = d1.clone();
	var nowDate = d1.toString('yyyy-MM-dd');
	ret = d1.getDayName();
	nowPos  = Date.getDayNumberFromName(ret); 
	startWeek = d1.add({ days: -nowPos }).toString('yyyy-MM-dd');
	weekLastPos = 6 - nowPos;
	endWeek = nowPos != 6 ? d2.add({ days: weekLastPos }).toString('yyyy-MM-dd') : nowDate;

	return { s: startWeek, e: endWeek };
}

/**
 * ajax �� ��Ȱ�� ����ϰ� html ���������� �ʿ��� ����
 * @author �ڳ��� nanhap@gmail.com
 * @date 2008-01-09
 */
var AjaxBoard = {
	/**
	 * table-row �ʱ�ȭ
	 * @param String sTableID
	 * @return void
	 */
	resetTable: function(sTableID)
	{
		var oTable = document.getElementById(sTableID);
		var oTBody = oTable.tBodies[0];
		var lastRow = oTBody.rows.length;
		while( true )
		{
			if( lastRow == 0 ) break;
			oTBody.deleteRow(lastRow - 1);
			var lastRow = oTBody.rows.length;
		}
	},

	/**
	 * ���̺� loading-row����
	 * @param Object object options - id: ���̵�, msg: ����
	 * @return void
	 */
	createLoading: function(options)
	{
		var setOptions = {
			type: 'image'
			, msg: '/images/ajax-loader3.gif'
			, colspan: 4
			, className: 'bg_white01'
			, rowHeight: '300px'
			}
		Object.extend(setOptions, options || {});

		var oTable = document.getElementById(setOptions['id']);
		var oTBody = oTable.tBodies[0];
		var row = oTBody.insertRow(0);
		row.setAttribute('height', setOptions['rowHeight'] || '0px');
		var cell = row.insertCell(0);
		cell.colSpan = setOptions['colspan'];
		cell.className = setOptions['className'];
		cell.align = 'center';
		switch(setOptions['type'])
		{
			default:
				cell.innerHTML = setOptions['msg'];
				break;
			case 'image':
				var objIMG = document.createElement('img');
				objIMG.src = setOptions['msg'];
				cell.appendChild(objIMG);
				break;
		}
	}
}

/**
 * ���̺� ����
 * @param object Object options sTableID, iCol, sDataType, sSortType
 * @return void
 * @author �ڳ��� nanhap@gmail.com
 * @date 2008-01-23
 */
function sortTable(options)
{
	var oTable = document.getElementById(options['sTableID']);
	var oTBody = oTable.tBodies[0];
	var colDataRows = oTBody.rows;
	var aTRs = new Array;

	for( var i=0; i < colDataRows.length; i++ )
	{
		aTRs[i] = colDataRows[i];
	}

	//if( oTable.sortCol == iCol )
	//	aTRs.reverse();
	//else
		aTRs.sort(generateCompareTRs(options));

	var oFragment = document.createDocumentFragment();
	for( var i=0; i < aTRs.length; i++ )
	{
		oFragment.appendChild(aTRs[i]);
	}

	oTBody.appendChild(oFragment);
	//oTable.sortCol = iCol;

	function convert(sValue, sDataType)
	{
		switch(sDataType)
		{
			case 'int':
				return parseInt(sValue);
			case 'float':
				return parseFloat(sValue);
			case 'date':
				return new Date(Date.parse(sValue));
			default:
				return sValue.toString();
		}
	}

	/**
	 * �� �Ϲ�ȭ
	 * @param object Object options
	 * @return Integer|boolen
	 */
	function generateCompareTRs(options)
	{
		return function compareTRs(oTR1, oTR2)
			{
				var vValue1 = convert(oTR1.cells[options['iCol']].firstChild.nodeValue, options['sDataType']);
				var vValue2 = convert(oTR2.cells[options['iCol']].firstChild.nodeValue, options['sDataType']);
				switch(options['sDataType'])
				{
					case 'int':
					case 'float':
					case 'date':
						switch(options['sSortType'])
						{
							default:
							case 'desc':
								return vValue2 - vValue1;
								break;
							case 'asc':
								return vValue1 - vValue2;
								break;
						}
						break;
					default:
							if (vValue1 < vValue2)
								return 1;
							else if (vValue1 > vValue2)
								return -1;
							else
								return 0;
						break;
				}
			};
	}
}