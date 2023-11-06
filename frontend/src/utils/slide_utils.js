import dayjs from "dayjs";
import config from "../configs.json";
import axios from "axios";
import utc from "dayjs/plugin/utc";
import { SlideTypes, Slide } from "../constants";

dayjs.extend(utc);

export const fetchSlides = async (startDate, endDate) => {
  if (!startDate || !endDate) {
    console.error("Both startDate and endDate fields are required.");
    return [];
  }
  if (startDate >= endDate) {
    console.error("End time must be after the start time.");
    return [];
  }
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  return axios
    .all([
      axios.get(
        `${config[process.env.NODE_ENV].apiDomain}/menus`,
        {
          params: {
            startDate: dayjs.utc(startDate).format("YYYY-MM-DD"),
            endDate: dayjs.utc(endDate).format("YYYY-MM-DD"),
          },
        },
        axiosConfig
      ),
      axios.get(
        `${config[process.env.NODE_ENV].apiDomain}/events`,
        {
          params: {
            startTime: dayjs.utc(startDate).format("YYYY-MM-DD HH:mm:ss"),
            endTime: dayjs.utc(endDate).format("YYYY-MM-DD HH:mm:ss"),
          },
        },
        axiosConfig
      ),
    ])
    .then(([res1, res2]) => {
      const menuSlides = res1.data.menus.map((menu) => {
        const descriptions = [];
        for (const [label, description] of Object.entries(menu.MenuData)) {
          descriptions.push(`${label} - ${description}`);
        }
        const date = dayjs(menu.Date.split("T")[0]);
        return new Slide(
          `${date.format("MMMM D, YYYY")} Menu`,
          "",
          descriptions.join(", "),
          SlideTypes.MENU,
          menu,
          date
        );
      });
      const eventSlides = res2.data.events.map((event) => {
        const startTime = dayjs(event.EventStartTime);
        const endTime = dayjs(event.EventEndTime);

        return new Slide(
          event.EventName,
          `${startTime.format("MMMM D, YYYY h:mmA")} through ${endTime.format(
            "MMMM D, YYYY h:mmA"
          )}`,
          event.EventDescription,
          SlideTypes.EVENT,
          event,
          startTime,
          endTime
        );
      });
      const slides = [...menuSlides, ...eventSlides];
      slides.sort((a, b) => a.start - b.start);
      return slides;
    })
    .catch((error) => {
      return [];
    });
};
