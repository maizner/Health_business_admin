/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.5.0): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import $ from 'jquery'
import Util from './util'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME                = 'alert'
const VERSION             = '4.5.0'
const DATA_KEY            = 'bs.alert'
const EVENT_KEY           = `.${DATA_KEY}`
const DATA_API_KEY        = '.data-api'
const JQUERY_NO_CONFLICT  = $.fn[NAME]

const SELECTOR_DISMISS = '[data-dismiss="alert"]'

const EVENT_CLOSE          = `close${EVENT_KEY}`
const EVENT_CLOSED         = `closed${EVENT_KEY}`
const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`

const CLASS_NAME_ALERT = 'alert'
const CLASS_NAME_FADE  = 'fade'
const CLASS_NAME_SHOW  = 'show'

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Alert {
  constructor(element) {
    this._element = element
  }

  // Getters

  static get VERSION() {
    return VERSION
  }

  // Public

  close(element) {
    let rootElement = this._element
    if (element) {
      rootElement = this._getRootElement(element)
    }

    const customEvent = this._triggerCloseEvent(rootElement)

    if (customEvent.isDefaultPrevented()) {
      return
    }

    this._removeElement(rootElement)
  }

  dispose() {
    $.removeData(this._element, DATA_KEY)
    this._element = null
  }

  // Private

  _getRootElement(element) {
    const selector = Util.getSelectorFromElement(element)
    let parent     = false

    if (selector) {
      parent = document.querySelector(selector)
    }

    if (!parent) {
      parent = $(element).closest(`.${CLASS_NAME_ALERT}`)[0]
    }

    return parent
  }

  _triggerCloseEvent(element) {
    const closeEvent = $.Event(EVENT_CLOSE)

    $(element).trigger(closeEvent)
    return closeEvent
  }

  _removeElement(element) {
    $(element).removeClass(CLASS_NAME_SHOW)

    if (!$(element).hasClass(CLASS_NAME_FADE)) {
      this._destroyElement(element)
      return
    }

    const transitionDuration = Util.getTransitionDurationFromElement(element)

    $(element)
      .one(Util.TRANSITION_END, (event) => this._destroyElement(element, event))
      .emulateTransitionEnd(transitionDuration)
  }

  _destroyElement(element) {
    $(element)
      .detach()
      .trigger(EVENT_CLOSED)
      .remove()
  }

  // Static

  static _jQueryInterface(config) {
    return this.each(function () {
      const $element = $(this)
      let data       = $element.data(DATA_KEY)

      if (!data) {
        data = new Alert(this)
        $element.data(DATA_KEY, data)
      }

      if (config === 'close') {
        data[config](this)
      }
    })
  }

  static _handleDismiss(alertInstance) {
    return function (event) {
      if (event) {
        event.preventDefault()
      }

      alertInstance.close(this)
    }
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

$(document).on(
  EVENT_CLICK_DATA_API,
  SELECTOR_DISMISS,
  Alert._handleDismiss(new Alert())
)

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME]             = Alert._jQueryInterface
$.fn[NAME].Constructor = Alert
$.fn[NAME].noConflict  = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return Alert._jQueryInterface
}

export default Alert

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ2ZW5kb3IvYm9vdHN0cmFwLTQuNS4wL2FsZXJ0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuNS4wKTogYWxlcnQuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvbnN0YW50c1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgTkFNRSAgICAgICAgICAgICAgICA9ICdhbGVydCdcbmNvbnN0IFZFUlNJT04gICAgICAgICAgICAgPSAnNC41LjAnXG5jb25zdCBEQVRBX0tFWSAgICAgICAgICAgID0gJ2JzLmFsZXJ0J1xuY29uc3QgRVZFTlRfS0VZICAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG5jb25zdCBEQVRBX0FQSV9LRVkgICAgICAgID0gJy5kYXRhLWFwaSdcbmNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgPSAkLmZuW05BTUVdXG5cbmNvbnN0IFNFTEVDVE9SX0RJU01JU1MgPSAnW2RhdGEtZGlzbWlzcz1cImFsZXJ0XCJdJ1xuXG5jb25zdCBFVkVOVF9DTE9TRSAgICAgICAgICA9IGBjbG9zZSR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX0NMT1NFRCAgICAgICAgID0gYGNsb3NlZCR7RVZFTlRfS0VZfWBcbmNvbnN0IEVWRU5UX0NMSUNLX0RBVEFfQVBJID0gYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxuXG5jb25zdCBDTEFTU19OQU1FX0FMRVJUID0gJ2FsZXJ0J1xuY29uc3QgQ0xBU1NfTkFNRV9GQURFICA9ICdmYWRlJ1xuY29uc3QgQ0xBU1NfTkFNRV9TSE9XICA9ICdzaG93J1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3MgRGVmaW5pdGlvblxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY2xhc3MgQWxlcnQge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnRcbiAgfVxuXG4gIC8vIEdldHRlcnNcblxuICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgcmV0dXJuIFZFUlNJT05cbiAgfVxuXG4gIC8vIFB1YmxpY1xuXG4gIGNsb3NlKGVsZW1lbnQpIHtcbiAgICBsZXQgcm9vdEVsZW1lbnQgPSB0aGlzLl9lbGVtZW50XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIHJvb3RFbGVtZW50ID0gdGhpcy5fZ2V0Um9vdEVsZW1lbnQoZWxlbWVudClcbiAgICB9XG5cbiAgICBjb25zdCBjdXN0b21FdmVudCA9IHRoaXMuX3RyaWdnZXJDbG9zZUV2ZW50KHJvb3RFbGVtZW50KVxuXG4gICAgaWYgKGN1c3RvbUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLl9yZW1vdmVFbGVtZW50KHJvb3RFbGVtZW50KVxuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGxcbiAgfVxuXG4gIC8vIFByaXZhdGVcblxuICBfZ2V0Um9vdEVsZW1lbnQoZWxlbWVudCkge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQpXG4gICAgbGV0IHBhcmVudCAgICAgPSBmYWxzZVxuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgIH1cblxuICAgIGlmICghcGFyZW50KSB7XG4gICAgICBwYXJlbnQgPSAkKGVsZW1lbnQpLmNsb3Nlc3QoYC4ke0NMQVNTX05BTUVfQUxFUlR9YClbMF1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50XG4gIH1cblxuICBfdHJpZ2dlckNsb3NlRXZlbnQoZWxlbWVudCkge1xuICAgIGNvbnN0IGNsb3NlRXZlbnQgPSAkLkV2ZW50KEVWRU5UX0NMT1NFKVxuXG4gICAgJChlbGVtZW50KS50cmlnZ2VyKGNsb3NlRXZlbnQpXG4gICAgcmV0dXJuIGNsb3NlRXZlbnRcbiAgfVxuXG4gIF9yZW1vdmVFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAkKGVsZW1lbnQpLnJlbW92ZUNsYXNzKENMQVNTX05BTUVfU0hPVylcblxuICAgIGlmICghJChlbGVtZW50KS5oYXNDbGFzcyhDTEFTU19OQU1FX0ZBREUpKSB7XG4gICAgICB0aGlzLl9kZXN0cm95RWxlbWVudChlbGVtZW50KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudChlbGVtZW50KVxuXG4gICAgJChlbGVtZW50KVxuICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCAoZXZlbnQpID0+IHRoaXMuX2Rlc3Ryb3lFbGVtZW50KGVsZW1lbnQsIGV2ZW50KSlcbiAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pXG4gIH1cblxuICBfZGVzdHJveUVsZW1lbnQoZWxlbWVudCkge1xuICAgICQoZWxlbWVudClcbiAgICAgIC5kZXRhY2goKVxuICAgICAgLnRyaWdnZXIoRVZFTlRfQ0xPU0VEKVxuICAgICAgLnJlbW92ZSgpXG4gIH1cblxuICAvLyBTdGF0aWNcblxuICBzdGF0aWMgX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0ICRlbGVtZW50ID0gJCh0aGlzKVxuICAgICAgbGV0IGRhdGEgICAgICAgPSAkZWxlbWVudC5kYXRhKERBVEFfS0VZKVxuXG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgZGF0YSA9IG5ldyBBbGVydCh0aGlzKVxuICAgICAgICAkZWxlbWVudC5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnID09PSAnY2xvc2UnKSB7XG4gICAgICAgIGRhdGFbY29uZmlnXSh0aGlzKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBzdGF0aWMgX2hhbmRsZURpc21pc3MoYWxlcnRJbnN0YW5jZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB9XG5cbiAgICAgIGFsZXJ0SW5zdGFuY2UuY2xvc2UodGhpcylcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4kKGRvY3VtZW50KS5vbihcbiAgRVZFTlRfQ0xJQ0tfREFUQV9BUEksXG4gIFNFTEVDVE9SX0RJU01JU1MsXG4gIEFsZXJ0Ll9oYW5kbGVEaXNtaXNzKG5ldyBBbGVydCgpKVxuKVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogalF1ZXJ5XG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4kLmZuW05BTUVdICAgICAgICAgICAgID0gQWxlcnQuX2pRdWVyeUludGVyZmFjZVxuJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IEFsZXJ0XG4kLmZuW05BTUVdLm5vQ29uZmxpY3QgID0gKCkgPT4ge1xuICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gIHJldHVybiBBbGVydC5falF1ZXJ5SW50ZXJmYWNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFsZXJ0XG4iXSwiZmlsZSI6InZlbmRvci9ib290c3RyYXAtNC41LjAvYWxlcnQuanMifQ==
