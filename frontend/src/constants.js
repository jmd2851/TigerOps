export const SlideTypes = {
  EVENT: 0,
  MENU: 1,
};

export const FormTypes = {
  CREATE: 0,
  EDIT: 1,
};

export class Slide {
  constructor(title, subheader, body, type, data, start, end = null) {
    this.title = title;
    this.subheader = subheader;
    this.body = body;
    this.type = type;
    this.data = data;
    this.start = start;
    this.end = end;
  }
}
