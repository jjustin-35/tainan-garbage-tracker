import config from "$config";
import ApiPath from "$constants/apiPath";

const getClearPoint = async () => {
  const url = `${config.TAINAN_API_URL}${ApiPath.GET_TAINAN_SQL_DATA}`;
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
};

export default getClearPoint;