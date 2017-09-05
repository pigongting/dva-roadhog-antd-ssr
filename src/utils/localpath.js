const localesReg = new RegExp('/en/|/zh/');
const apiReg = new RegExp('/api/');

export function getpruepath(pathname) {
  let pruepath = pathname.replace(/\/$/, '');
  pruepath = pruepath.replace(/.*?(\.html)$/, '');
  return pruepath;
}

export function getlocalname(pruepath) {
  let localname = 'zh';

  if (localesReg.test(pruepath)) {
    pruepath.split('/')[1];
  }

  return localname;
}

export function removelocal(pathname) {
  const pruepath = getpruepath(pathname);

  if (localesReg.test(pruepath)) {
    const localname = getlocalname(pruepath);
    const localnameReg = new RegExp(`/${localname}`);

    return pruepath.replace(localnameReg, '');
  } else {
    return pruepath;
  }
}

export function historyreplace(history, pruepath, next) {
  if (!localesReg.test(pruepath)) {
    if (pruepath === '') {
      history.replace('/zh/index');
    } else {
      history.replace(`/zh${pruepath}`);
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
