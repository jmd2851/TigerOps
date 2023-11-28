import axios from "axios";
import config from "../configs.json";

export const fetchConfig = () => {
  return axios
    .get(`${config[process.env.NODE_ENV].apiDomain}/config`)
    .then((res) => {
      const configs = res.data.config.reduce((acc, currentValue, index) => {
        acc[currentValue.Name] = currentValue.Value;
        return acc;
      }, {});
      return configs;
    });
};
