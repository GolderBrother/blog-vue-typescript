/*
 * @Description: cookie、localStorage、sessionStorage的存取数据工具 
 * @Author: james.zhang 
 * @Date: 2019-06-02 20:03:41 
 * @Last Modified by: james.zhang
 * @Last Modified time: 2019-06-02 20:32:05
 */

const ls = window.localStorage;
const ss = window.sessionStorage;

export const Cookie = {
  get(key:string): any {
    let arr = document.cookie.split("; ");
    if (arr.length > 0) {
      for (let item of arr) {
        let cookieArr = item.trim().split('=');
        if (cookieArr[0] === key) {
          return cookieArr[1]
        }
      }
    }
    return '';
  },
  set(key: string, value: any, day: number) {
    // 获取key值
    let setting = arguments[0];
    // 判断是否为对象,是对象的话遍历set
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (let i in setting) {
        let oDate = new Date();
        oDate.setDate(oDate.getDate() + day);
        document.cookie = i + '=' + setting[i] + ';expires=' + oDate;
      }
    } else {
      let oDate = new Date();
      oDate.setDate(oDate.getDate() + day);
      document.cookie = key + '=' + value + ';expires=' + oDate;
    }
  },
  remove(key: string) {
    let setting = arguments[0];
    // 判断为数组，就遍历
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Array') {
      setting.forEach((key: any) => {
        this.set(key, 1, -1)
      })
    } else {
      this.set(key, 1, -1)
    }
  }
}

export const Local = {
  get(key: string) {
    if (key) return JSON.parse(ls.getItem(key) || "null")
    return null
  },
  set(key: string, val: any): void {
    const setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Array') {
      for (let i in setting) {
        ls.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      ls.setItem(key, JSON.stringify(val))
    }
  },
  remove(key: string): void {
    if (key) {
      ls.removeItem(key)
    }
  },
  clear(): void {
    ls.clear()
  }
}

export const Session = {
  get(key: string): any {
    if (key) return JSON.parse(ss.getItem(key) || "null")
    return null
  },
  set(key: string, value: any): void {
    const setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Array') {
      for (let i in setting) {
        ss.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      ss.setItem(key, JSON.stringify(value))
    }
  },
  remove(key:string): void {
    if (key) {
      ss.removeItem(key)
    }
  },
  clear(): void {
    ss.clear()
  }
}
