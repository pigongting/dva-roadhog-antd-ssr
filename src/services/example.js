import request from '../utils/request';

export function query() {
  return request('/api/users');
}

export function fetch(action, config, options) {
  console.log(options);
  return request(action, config, {"Url":"http://service.bestva.org:8086/bestvaol/Service","AppInfo":{"innerversion":"1.9.9.32474","version":"3.3.0","platform":"Android"},"UniqueKey":"YunJu.BestvaOl.CustomerCouPon","MethodName":"GetCouPonInfoList","ObjectData":{"IsNotPage":false,"CurrentPage":1,"PageSize":20,"OrderBys":[{"Column":"Sort","Order":1},{"Column":"CreateDate","Order":1}],"Tag":"商场"},"Tag":"","ClientID":"9df3eaa6-fdd4-7bb8-835a-d494fc53fc9b","LoginInfo":null,"Token":"","UserGid":"","ClientTime":"2017-08-01T05:53:59.278Z","ClientType":"olapp","HostUrl":"","UserNo":"","Timeout":30000,"OfflineStoreGid":null});
}

export function fetchbanner(action, config, options) {
  console.log('fetchbanner');
  return request(action, config, {"Url":"http://service.bestva.org:8086/bestvaol/Service","AppInfo":{"innerversion":"1.9.9.32474","version":"3.3.0","platform":"Android"},"UniqueKey":"YunJu.BestvaOl.CustomerCouPon","MethodName":"GetCouPonInfoList","ObjectData":{"IsNotPage":false,"CurrentPage":1,"PageSize":20,"OrderBys":[{"Column":"Sort","Order":1},{"Column":"CreateDate","Order":1}],"Tag":"商场"},"Tag":"","ClientID":"9df3eaa6-fdd4-7bb8-835a-d494fc53fc9b","LoginInfo":null,"Token":"","UserGid":"","ClientTime":"2017-08-01T05:53:59.278Z","ClientType":"olapp","HostUrl":"","UserNo":"","Timeout":30000,"OfflineStoreGid":null});
}