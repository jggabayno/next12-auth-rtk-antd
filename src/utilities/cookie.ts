import { 
	CookieSerializeOptions,
	serialize,
	parse
} from 'cookie'

import { 
	IncomingMessage,
	ServerResponse
} from 'http'

interface OptionsType extends CookieSerializeOptions
{
    res?: ServerResponse;
    req?: IncomingMessage &
	{
        cookies?: { [key: string]: string; } | Partial<{ [key: string]: string}>
    }
}

type TmpCookiesObj = { [key: string]: string } | Partial<{ [key: string]: string}>
type CookieValueTypes = string | boolean | undefined | null | any;

const isServerSide : boolean = typeof window === 'undefined'

const processValue = ( value: string ) : CookieValueTypes =>
{
	if ( value === 'true' ) return true;
	if ( value === 'false' ) return false;
	if ( value === 'undefined' ) return undefined;
	if ( value === 'null' ) return null;
	return value;
}

const stringify = ( value: string = '' ) =>
{
	try
	{
		const result = JSON.stringify(value);

		return (/^[\{\[]/.test(result)) ? result : value;

	} catch (e) {

		return value;

	}
}

const decode = ( str: string ): string =>
{
	if ( !str ) return str;

	return str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
}

export const getCookies = ( options?: OptionsType ): TmpCookiesObj =>
{
	let req;

	if  ( options ) req = options.req;

	if ( isServerSide ) {
		// if cookie-parser is used in project get cookies from ctx.req.cookies
		// if cookie-parser isn't used in project get cookies from ctx.req.headers.cookie
		if ( req && req.cookies ) return req.cookies;
		if ( req && req.headers && req.headers.cookie ) return parse(req.headers.cookie);
		return {};
	}

	const _cookies: TmpCookiesObj = {};
	const documentCookies = document.cookie ? document.cookie.split('; ') : [];

	for ( let i = 0, len = documentCookies.length; i < len; i++ ) {
		const cookieParts = documentCookies[i].split('=');

		const _cookie = cookieParts.slice(1).join('=');
		const name = cookieParts[0];

		_cookies[name] = _cookie;
	}

	return _cookies;
}

export const getCookie = ( key: string, options?: OptionsType ): CookieValueTypes =>
{
	const _cookies = getCookies(options);
	const value    = _cookies[key];

	if ( value === undefined ) return undefined;
	
	return processValue(decode(value));
}

export const setCookie = ( key: string, data: any, options?: OptionsType ): void =>
{
	let _cookieOptions: any;

	let _req;

	let _res;

	if ( options )
	{
		const { req, res, ..._options } = options;
		_req = req;
		_res = res;
		_cookieOptions = _options;
	}

	const cookieStr = serialize(
		key,
		stringify( data ),
		{ path: '/', maxAge: 60 * 6 * 24, ..._cookieOptions }
	);

	if ( isServerSide )
	{

		if ( _res && _req )
		{
			
			let currentCookies = _res.getHeader('Set-Cookie');

			if( !Array.isArray(currentCookies) )
			{
      				currentCookies = !currentCookies ? [] : [String(currentCookies)];
			}
			_res.setHeader('Set-Cookie', currentCookies.concat(cookieStr));

			if ( _req && _req.cookies )
			{
				const _cookies = _req.cookies;
				data === '' ?  delete _cookies[key] : _cookies[key] = stringify(data);
			}

			if ( _req && _req.headers &&_req.headers.cookie )
			{
				const _cookies = parse(_req.headers.cookie);

				data === '' ?  delete _cookies[key] : _cookies[key] = stringify(data);

				_req.headers.cookie = Object.entries(_cookies).reduce((acc, cur) => {
					return acc.concat(`${cur[0]}=${cur[1]};`);
				}, '');
			}
		}
	} else {

		document.cookie = cookieStr;

	}
}
 
export const removeCookie = ( key: string, options?: OptionsType ): void =>
{
	return setCookie(key, '', { ...options, maxAge: -1 });
}

export const hasCookie = ( key: string,  options?: OptionsType ): boolean =>
{
	if ( !key ) return false;

	const cookie = getCookies(options);
	return cookie.hasOwnProperty(key);
}