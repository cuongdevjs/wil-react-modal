// @flow
export default class Emitter {
  events = {};

  emit(type: string, data: any): void {
    if (this.events[type]) {
      this.events[type].forEach(
        ({ listener }: { listener: Function }): void => {
          listener(data);
        }
      );
    }
  }

  on(type: string, listener: Function): number {
    const date: Object = new Date();
    const token: number = date.getTime();
    this.events = {
      ...this.events,
      [type]: [
        ...(this.events[type] || []),
        {
          listener,
          token
        }
      ]
    };
    return token;
  }

  once(type: string, listener: Function): number {
    const date: Object = new Date();
    const token: number = date.getTime();
    this.events = {
      ...this.events,
      [type]: [{ listener, token }]
    };
    return token;
  }

  off(token: number): void {
    this.events = Object.keys(this.events).reduce(
      (obj: Object, key: string): Object => {
        return {
          ...obj,
          [key]: this.events[key].filter((item: Object): boolean => {
            return item.token !== token;
          })
        };
      },
      {}
    );
  }

  offReference(type: string, listener: Function): void {
    if (this.events[type]) {
      this.events[type] = this.events[type].filter((item: Object): boolean => {
        return item.listener !== listener;
      });
    }
  }

  offEvent(type: string): void {
    if (this.events[type]) {
      this.events = Object.keys(this.events).reduce(
        (obj: Object, key: string): Object => {
          return {
            ...obj,
            ...(key === type ? {} : { [key]: this.events[key] })
          };
        },
        {}
      );
    }
  }
}
