const Message = (function constructor () {
    const component = {
        body: document.getElementsByTagName('body')[0],
        container: document.createElement('div'),
        css: document.createElement('style'),
        /**
         * Mount Message container and styles to DOM
         */
        mount: function () {
            // Add container Class
            this.container.setAttribute('class', 'flash-message')

            // Append Styles
            this.css.type = 'text/css'
            if (this.css.styleSheet) {
                this.css.styleSheet.cssText = styles
            } else {
                this.css.appendChild(document.createTextNode(styles))
            }
            this.container.appendChild(this.css)

            //Append Message Container To Body
            this.body.appendChild(this.container)

            //Set Flag to avoid repetition
            this.mounted = true
        },
        /**
         * Create Message Content container
         * @param type
         * @param msg
         */
        create: function (type, msg) {
            // Check if component is mounted
            if (!this.mounted) {
                this.mount()
            }

            // Icon
            const icon = this.createIcon(type)

            // Text
            const text = document.createElement('span')
            text.textContent = msg

            // Content element
            const content = document.createElement('div')
            content.setAttribute('class', 'flash-message-inner-content')
            content.appendChild(icon)
            content.appendChild(text)

            // Inner element
            const inner = document.createElement('div')
            inner.setAttribute('class', 'flash-message-inner')
            inner.classList.add('class', 'appear-animation')
            inner.appendChild(content)

            //Message Container
            this.container.appendChild(inner)

            // Set Time out to remove Message
            setTimeout(this.remove.bind(this, inner), 3000)
        },
        /**
         * Destroy Message Content container
         * @param el
         * @returns {Node}
         */
        destroy: function (el) {
            return this.container.removeChild(el)
        },
        /**
         * Set Remove Animation
         * @param el
         * @returns {number}
         */
        remove: function (el) {
            el.classList.add('remove-animation')
            return setTimeout(this.destroy.bind(this, el), 200)
        },
        /**
         * Create Message Icon by message type
         * @param type
         * @returns {HTMLImageElement}
         */
        createIcon: function (type) {
            const icon = document.createElement('img')
            icon.setAttribute('class', 'icon')
            switch (type) {
                case 'error':
                    icon.setAttribute('src', '/assets/img/icons/cross.svg')
                    break
                case 'success':
                    icon.setAttribute('src', 'assets/img/icons/success.svg')
                    break
                default:
                    icon.setAttribute('src', 'assets/img/icons/default.svg')
            }
            return icon
        }
    }
    /**
     * Return Message Object and lock properties
     */
    return Object.freeze({
        success: function (message) {
            return component.create('success', message)
        },
        error: function (message) {
            return component.create('error', message)
        },
        default: function (message) {
            return component.create('default', message)
        }
    })
})()

export default Message

var styles = `
.flash-message {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, .65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  -webkit-font-feature-settings: "tnum";
  font-feature-settings: "tnum", "tnum";
  position: fixed;
  top: 16px;
  left: 0;
  z-index: 1010;
  width: 100%;
  pointer-events: none;
}
.flash-message div.flash-message-inner {
  padding: 8px;
}

.flash-message-inner:first-child {
  margin-top: 8px;
}

.flash-message-inner-content {
  display: inline-block;
  padding: 10px 16px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, .15);
  pointer-events: all;
}

.flash-message-inner-content p {
  margin: 0;
  padding: 3px;
}

.flash-message .icon {
  width: 15px;
  height: 15px;
  position: relative;
  top: 2px;
  margin-right: 8px;
}

.flash-message-success .icon {
  color: #52c41a;
}

.flash-message-inner.remove-animation {
  overflow: hidden;
  -webkit-animation-name: MessageMoveOut;
  animation-name: MessageMoveOut;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
}

.flash-message-inner.appear-animation {
  overflow: auto;
  -webkit-animation-name: MessageMoveIn;
  animation-name: MessageMoveIn;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
}

@-webkit-keyframes MessageMoveOut {
  0% {
    max-height: 150px;
    padding: 8px;
    opacity: 1;
  }
  100% {
    max-height: 0;
    padding: 0;
    opacity: 0;
  }
}

@keyframes MessageMoveOut {
  0% {
    max-height: 150px;
    padding: 8px;
    opacity: 1;
  }
  100% {
    max-height: 0;
    padding: 0;
    opacity: 0;
  }
}

@-webkit-keyframes MessageMoveIn {
  0% {
    opacity: 0;
    max-height: 0;
    padding: 0;
  }
  100% {
    padding: 8px;
    max-height: 150px;
    opacity: 1;
  }
}

@keyframes MessageMoveIn {
  0% {
    max-height: 0;
    padding: 0;
    opacity: 0;
  }
  100% {
    max-height: 150px;
    padding: 8px;
    opacity: 1;
  }
}
`