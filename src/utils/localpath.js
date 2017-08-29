const localesReg = new RegExp('/en/|/zh/');
const apiReg = new RegExp('/api/');

export function getpruepath(pathname) {
  return pathname.replace(/\/$/, '');
}

export function getlocalname(pathname) {
  let localname = 'zh';

  if (localesReg.test(pathname)) {
    pathname.split('/')[1];
  }

  return localname;
}

export function removelocal(pathname) {
  const pruepath = getpruepath(pathname);

  if (localesReg.test(pruepath)) {
    const localname = getlocalname(pathname);
    const localnameReg = new RegExp(`/${localname}`);

    return pruepath.replace(localnameReg, '');
  } else {
    return pruepath;
  }
}

export function historyreplace(history, pathname, next) {
  if (!localesReg.test(pathname)) {
    if (pathname === '') {
      history.replace('/zh/index');
    } else {
      history.replace(`/zh${pathname}`);
    }
  }
}

export function localMiddle(req, res, next) {
  const pruepath = getpruepath(req._parsedUrl.pathname);

  if (apiReg.test(pruepath)) {
    next();
  } else if (localesReg.test(pruepath)) {
    next();
  } else if (pruepath === '') {
    res.redirect('/zh/index');
  } else {
    res.redirect(`/zh${pruepath}`);
  }
}
