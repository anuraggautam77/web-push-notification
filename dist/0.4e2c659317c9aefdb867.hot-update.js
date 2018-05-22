webpackHotUpdate(0,{58:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(3);\n\nvar _auth = __webpack_require__(59);\n\nvar _pubsubJs = __webpack_require__(12);\n\nvar _pubsubJs2 = _interopRequireDefault(_pubsubJs);\n\n__webpack_require__(61);\n\nvar _router = __webpack_require__(62);\n\nvar _router2 = _interopRequireDefault(_router);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar App = function (_Component) {\n    _inherits(App, _Component);\n\n    function App(props) {\n        _classCallCheck(this, App);\n\n        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));\n\n        _this.state = { \"isLoggedIn\": window.localStorage.getItem('isLoggedIn') };\n        _this.mySubscriber = _this.mySubscriber.bind(_this);\n        _pubsubJs2.default.subscribe('IS_LOGIN', _this.mySubscriber);\n        _this.auth = new _auth.Auth();\n        if (_this.state.isLoggedIn) {\n            _this.auth.activeInterval(_this.props.history);\n        } else {\n            _this.auth.stopInterval();\n        }\n\n        return _this;\n    }\n\n    _createClass(App, [{\n        key: 'initGeolocation',\n        value: function initGeolocation(callback) {\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position) {\n                    if (window.localStorage.getItem('plat-log') === null) {\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                    }\n                    callback();\n                }, function (error) {\n                    console.log(\"err>\", error);\n                }, { timeout: 10000 });\n\n                navigator.geolocation.watchPosition(function (position) {\n                    console.log(position.coords.latitude + \"--\" + position.coords.longitude);\n                    if (window.localStorage.getItem('plat-log') !== position.coords.latitude + \"--\" + position.coords.longitude) {\n                        console.log(\">>>Change in address\");\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                });\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n\n            /* this.initGeolocation( ()=> {\r\n             this.getcode();\r\n             });\r\n             */\n\n            this.getCurrentLoc(function () {\n                //this.getPostalCode();\n            });\n        }\n    }, {\n        key: 'checkDistanceBetweenlocation',\n        value: function checkDistanceBetweenlocation(oldloc, newloc, unit) {\n\n            var lat1 = oldloc.split(\"--\")[0];\n            var lon1 = oldloc.split(\"--\")[1];\n\n            var lat2 = newloc.latitude;\n            var lon2 = newloc.longitude;\n\n            var radlat1 = Math.PI * lat1 / 180;\n            var radlat2 = Math.PI * lat2 / 180;\n            //  var radlon1 = Math.PI * lon1 / 180\n            // var radlon2 = Math.PI * lon2 / 180\n            var theta = lon1 - lon2;\n            var radtheta = Math.PI * theta / 180;\n            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);\n            dist = Math.acos(dist);\n            dist = dist * 180 / Math.PI;\n            dist = dist * 60 * 1.1515;\n            if (unit == \"K\") {\n                dist = dist * 1.609344;\n            }\n            if (unit == \"N\") {\n                dist = dist * 0.8684;\n            }\n            return dist;\n        }\n    }, {\n        key: 'getCurrentLoc',\n        value: function getCurrentLoc(callback) {\n            var _this2 = this;\n\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position) {\n                    if (window.localStorage.getItem('clat-log') === null) {\n                        window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    } else {\n                        console.log(\">>>>>>>>>>>\");\n                        _this2.checkDistanceBetweenlocation(window.localStorage.setItem('clat-log'), position.coords);\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                }, { timeout: 10000 });\n\n                navigator.geolocation.watchPosition(function (position) {\n                    console.log(position.coords.latitude + \"--\" + position.coords.longitude);\n\n                    if (window.localStorage.getItem('clat-log') === null) {\n                        window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    } else {\n\n                        _this2.checkDistanceBetweenlocation();\n\n                        /*\r\n                         if (window.localStorage.getItem('clat-log') !== position.coords.latitude + \"--\" + position.coords.longitude) {\r\n                         window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\r\n                         } */\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                });\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'getcode',\n        value: function getcode() {\n            var _this3 = this;\n\n            var lat,\n                lng = '';\n            if (window.localStorage.getItem('clat-log') !== null) {\n                lat = window.localStorage.getItem('clat-log').split('--')[0];\n                lng = window.localStorage.getItem('clat-log').split('--')[1];\n                var geocoder = new google.maps.Geocoder();\n                var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };\n                geocoder.geocode({ 'location': latlng }, function (results, status) {\n                    if (status === 'OK') {\n                        _this3.getZipcode(results);\n                    } else {\n                        window.alert('Geocoder failed due to: ' + status);\n                    }\n                });\n            }\n        }\n    }, {\n        key: 'getZipcode',\n        value: function getZipcode(place) {\n\n            var zipcodes = [];\n            if (Array.isArray(place)) {\n                for (var k = 0; k < place.length; k++) {\n                    for (var i = 0; i < place[k].address_components.length; i++) {\n                        for (var j = 0; j < place[k].address_components[i].types.length; j++) {\n                            if (place[k].address_components[i].types[j] == \"postal_code\") {\n                                // console.log(place[k].address_components[i].long_name);\n                                zipcodes.push(place[k].address_components[i].long_name);\n                            }\n                        }\n                    }\n                }\n            } else {\n                for (var i = 0; i < place.address_components.length; i++) {\n                    for (var j = 0; j < place.address_components[i].types.length; j++) {\n                        if (place.address_components[i].types[j] == \"postal_code\") {\n                            // console.log(place.address_components[i].long_name);\n                            zipcodes.push(place.address_components[i].long_name);\n                        }\n                    }\n                }\n            }\n            console.log(zipcodes);\n            if (zipcodes.length > 0) {\n                window.localStorage.setItem('czipcodes', zipcodes);\n                //Store in IndexDB\n                // store.storeinIdb();\n            }\n        }\n    }, {\n        key: 'saveCurrentLocation',\n        value: function saveCurrentLocation() {\n            if (window.localStorage.getItem('deviceToken') !== null && window.localStorage.getItem('plat-log') !== null) {\n                fetch('/api/whereiam', { method: 'post', headers: { 'Content-Type': 'application/json' },\n                    body: JSON.stringify({\n                        platlng: window.localStorage.getItem('plat-log'),\n                        pzipcodes: window.localStorage.getItem('pzipcodes'),\n                        userId: window.localStorage.getItem('userid'),\n                        token: window.localStorage.getItem('deviceToken')\n                    })\n                }).then(function (res) {\n                    return res.json();\n                }).then(function (json) {\n                    console.log(json);\n                });\n            }\n        }\n    }, {\n        key: 'mySubscriber',\n        value: function mySubscriber(msg, data) {\n\n            if (data.status) {\n                window.localStorage.setItem('accessToken', data.token);\n                window.localStorage.setItem('userid', data.userid);\n                window.localStorage.setItem('isLoggedIn', true);\n                this.auth.activeInterval(this.props.history);\n                //   this.saveCurrentLocation();\n            } else {\n                window.localStorage.removeItem('accessToken');\n                window.localStorage.removeItem('userid');\n                window.localStorage.removeItem('isLoggedIn');\n                this.auth.stopInterval();\n            }\n            this.isLoggedIn(data);\n        }\n    }, {\n        key: 'isLoggedIn',\n        value: function isLoggedIn(data) {\n            var boolFlag = window.localStorage.getItem('isLoggedIn');\n            if (data.hasOwnProperty('callback')) {\n                data.callback();\n            }\n\n            if (!data.status) {\n                _pubsubJs2.default.publish('IS_LOGOUT');\n            }\n\n            this.setState({\n                isLoggedIn: boolFlag !== null && boolFlag !== '' ? JSON.parse(boolFlag) : false\n            });\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return _react2.default.createElement(\n                'div',\n                null,\n                _react2.default.createElement(_router2.default, { islogin: this.state.isLoggedIn })\n            );\n        }\n    }]);\n\n    return App;\n}(_react.Component);\n\nexports.default = (0, _reactRouterDom.withRouter)(App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL0FwcC5qcz9hMGY1Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwic3RhdGUiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibXlTdWJzY3JpYmVyIiwiYmluZCIsIlB1YlN1YiIsInN1YnNjcmliZSIsImF1dGgiLCJBdXRoIiwiaXNMb2dnZWRJbiIsImFjdGl2ZUludGVydmFsIiwiaGlzdG9yeSIsInN0b3BJbnRlcnZhbCIsImNhbGxiYWNrIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsInNldEl0ZW0iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInRpbWVvdXQiLCJ3YXRjaFBvc2l0aW9uIiwiZ2V0Q3VycmVudExvYyIsIm9sZGxvYyIsIm5ld2xvYyIsInVuaXQiLCJsYXQxIiwic3BsaXQiLCJsb24xIiwibGF0MiIsImxvbjIiLCJyYWRsYXQxIiwiTWF0aCIsIlBJIiwicmFkbGF0MiIsInRoZXRhIiwicmFkdGhldGEiLCJkaXN0Iiwic2luIiwiY29zIiwiYWNvcyIsImNoZWNrRGlzdGFuY2VCZXR3ZWVubG9jYXRpb24iLCJsYXQiLCJsbmciLCJnZW9jb2RlciIsImdvb2dsZSIsIm1hcHMiLCJHZW9jb2RlciIsImxhdGxuZyIsInBhcnNlRmxvYXQiLCJnZW9jb2RlIiwicmVzdWx0cyIsInN0YXR1cyIsImdldFppcGNvZGUiLCJhbGVydCIsInBsYWNlIiwiemlwY29kZXMiLCJBcnJheSIsImlzQXJyYXkiLCJrIiwibGVuZ3RoIiwiaSIsImFkZHJlc3NfY29tcG9uZW50cyIsImoiLCJ0eXBlcyIsInB1c2giLCJsb25nX25hbWUiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInBsYXRsbmciLCJwemlwY29kZXMiLCJ1c2VySWQiLCJ0b2tlbiIsInRoZW4iLCJyZXMiLCJqc29uIiwibXNnIiwiZGF0YSIsInVzZXJpZCIsInJlbW92ZUl0ZW0iLCJib29sRmxhZyIsImhhc093blByb3BlcnR5IiwicHVibGlzaCIsInNldFN0YXRlIiwicGFyc2UiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDTUEsRzs7O0FBQ0YsaUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw4R0FDVEEsS0FEUzs7QUFFZixjQUFLQyxLQUFMLEdBQWEsRUFBQyxjQUFjQyxPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixZQUE1QixDQUFmLEVBQWI7QUFDQSxjQUFLQyxZQUFMLEdBQW9CLE1BQUtBLFlBQUwsQ0FBa0JDLElBQWxCLE9BQXBCO0FBQ0FDLDJCQUFPQyxTQUFQLENBQWlCLFVBQWpCLEVBQTZCLE1BQUtILFlBQWxDO0FBQ0EsY0FBS0ksSUFBTCxHQUFZLElBQUlDLFVBQUosRUFBWjtBQUNBLFlBQUksTUFBS1QsS0FBTCxDQUFXVSxVQUFmLEVBQTJCO0FBQ3ZCLGtCQUFLRixJQUFMLENBQVVHLGNBQVYsQ0FBeUIsTUFBS1osS0FBTCxDQUFXYSxPQUFwQztBQUNILFNBRkQsTUFFTztBQUNILGtCQUFLSixJQUFMLENBQVVLLFlBQVY7QUFDSDs7QUFWYztBQVlsQjs7Ozt3Q0FFZUMsUSxFQUFVO0FBQ3RCLGdCQUFJQyxhQUFhQSxVQUFVQyxXQUEzQixFQUF3QztBQUNwQ0QsMEJBQVVDLFdBQVYsQ0FBc0JDLGtCQUF0QixDQUF5QyxVQUFDQyxRQUFELEVBQWM7QUFDbkQsd0JBQUlqQixPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixVQUE1QixNQUE0QyxJQUFoRCxFQUFzRDtBQUNsREYsK0JBQU9DLFlBQVAsQ0FBb0JpQixPQUFwQixDQUE0QixVQUE1QixFQUF3Q0QsU0FBU0UsTUFBVCxDQUFnQkMsUUFBaEIsR0FBMkIsSUFBM0IsR0FBa0NI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QTtBQUNILGFBTkQsTUFNTztBQUNIWCx1QkFBT0MsWUFBUCxDQUFvQnVGLFVBQXBCLENBQStCLGFBQS9CO0FBQ0F4Rix1QkFBT0MsWUFBUCxDQUFvQnVGLFVBQXBCLENBQStCLFFBQS9CO0FBQ0F4Rix1QkFBT0MsWUFBUCxDQUFvQnVGLFVBQXBCLENBQStCLFlBQS9CO0FBQ0EscUJBQUtqRixJQUFMLENBQVVLLFlBQVY7QUFDSDtBQUNELGlCQUFLSCxVQUFMLENBQWdCNkUsSUFBaEI7QUFDSDs7O21DQUNVQSxJLEVBQU07QUFDYixnQkFBSUcsV0FBV3pGLE9BQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFlBQTVCLENBQWY7QUFDQSxnQkFBSW9GLEtBQUtJLGNBQUwsQ0FBb0IsVUFBcEIsQ0FBSixFQUFxQztBQUNqQ0oscUJBQUt6RSxRQUFMO0FBQ0g7O0FBRUQsZ0JBQUksQ0FBQ3lFLEtBQUs3QixNQUFWLEVBQWtCO0FBQ2RwRCxtQ0FBT3NGLE9BQVAsQ0FBZSxXQUFmO0FBQ0g7O0FBRUQsaUJBQUtDLFFBQUwsQ0FBYztBQUNWbkYsNEJBQWFnRixhQUFhLElBQWIsSUFBcUJBLGFBQWEsRUFBbkMsR0FBeUNiLEtBQUtpQixLQUFMLENBQVdKLFFBQVgsQ0FBekMsR0FBZ0U7QUFEbEUsYUFBZDtBQUdIOzs7aUNBQ1E7QUFDTCxtQkFDUTtBQUFBO0FBQUE7QUFDSSw4Q0FBQyxnQkFBRCxJQUFTLFNBQVMsS0FBSzFGLEtBQUwsQ0FBV1UsVUFBN0I7QUFESixhQURSO0FBSUg7Ozs7RUFoUGFxRixnQjs7a0JBbVBILGdDQUFXakcsR0FBWCxDIiwiZmlsZSI6IjU4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzLCBDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XHJcbmltcG9ydCB7QXV0aH0gZnJvbSAnLi9jb21tb24vYXV0aCc7XHJcbmltcG9ydCBQdWJTdWIgZnJvbSAncHVic3ViLWpzJztcclxuaW1wb3J0ICcuL3N0eWxlL2Nzcy9BcHAuc2Nzcyc7XHJcbmltcG9ydCBSb3V0aW5nIGZyb20gJy4vcm91dGVyL3JvdXRlcic7XHJcbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1wiaXNMb2dnZWRJblwiOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lzTG9nZ2VkSW4nKX07XHJcbiAgICAgICAgdGhpcy5teVN1YnNjcmliZXIgPSB0aGlzLm15U3Vic2NyaWJlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ0lTX0xPR0lOJywgdGhpcy5teVN1YnNjcmliZXIpO1xyXG4gICAgICAgIHRoaXMuYXV0aCA9IG5ldyBBdXRoKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNMb2dnZWRJbikge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGguYWN0aXZlSW50ZXJ2YWwodGhpcy5wcm9wcy5oaXN0b3J5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGguc3RvcEludGVydmFsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbml0R2VvbG9jYXRpb24oY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAobmF2aWdhdG9yICYmIG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xyXG4gICAgICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGxhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnI+XCIsIGVycm9yKTtcclxuXHJcbiAgICAgICAgICAgIH0sIHt0aW1lb3V0OiAxMDAwMH0pO1xyXG5cclxuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24oKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSAhPT0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPj4+Q2hhbmdlIGluIGFkZHJlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwbGF0LWxvZycsIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyPlwiLCBlcnJvcilcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR2VvbG9jYXRpb24gaXMgbm90IHN1cHBvcnRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuXHJcbiAgICAgICAgLyogdGhpcy5pbml0R2VvbG9jYXRpb24oICgpPT4ge1xyXG4gICAgICAgICB0aGlzLmdldGNvZGUoKTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgICovXHJcblxyXG5cclxuICAgICAgICB0aGlzLmdldEN1cnJlbnRMb2MoKCkgPT4ge1xyXG4gICAgICAgICAgICAvL3RoaXMuZ2V0UG9zdGFsQ29kZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjaGVja0Rpc3RhbmNlQmV0d2VlbmxvY2F0aW9uKG9sZGxvYywgbmV3bG9jLHVuaXQpIHtcclxuXHJcbiAgICAgICAgbGV0IGxhdDEgPSBvbGRsb2Muc3BsaXQoXCItLVwiKVswXTtcclxuICAgICAgICBsZXQgbG9uMSA9IG9sZGxvYy5zcGxpdChcIi0tXCIpWzFdO1xyXG5cclxuICAgICAgICBsZXQgbGF0MiA9IG5ld2xvYy5sYXRpdHVkZTtcclxuICAgICAgICBsZXQgbG9uMiA9IG5ld2xvYy5sb25naXR1ZGU7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHZhciByYWRsYXQxID0gTWF0aC5QSSAqIGxhdDEgLyAxODBcclxuICAgICAgICB2YXIgcmFkbGF0MiA9IE1hdGguUEkgKiBsYXQyIC8gMTgwXHJcbiAgICAgIC8vICB2YXIgcmFkbG9uMSA9IE1hdGguUEkgKiBsb24xIC8gMTgwXHJcbiAgICAgICAgLy8gdmFyIHJhZGxvbjIgPSBNYXRoLlBJICogbG9uMiAvIDE4MFxyXG4gICAgICAgIHZhciB0aGV0YSA9IGxvbjEgLSBsb24yXHJcbiAgICAgICAgdmFyIHJhZHRoZXRhID0gTWF0aC5QSSAqIHRoZXRhIC8gMTgwXHJcbiAgICAgICAgdmFyIGRpc3QgPSBNYXRoLnNpbihyYWRsYXQxKSAqIE1hdGguc2luKHJhZGxhdDIpICsgTWF0aC5jb3MocmFkbGF0MSkgKiBNYXRoLmNvcyhyYWRsYXQyKSAqIE1hdGguY29zKHJhZHRoZXRhKTtcclxuICAgICAgICBkaXN0ID0gTWF0aC5hY29zKGRpc3QpXHJcbiAgICAgICAgZGlzdCA9IGRpc3QgKiAxODAgLyBNYXRoLlBJXHJcbiAgICAgICAgZGlzdCA9IGRpc3QgKiA2MCAqIDEuMTUxNVxyXG4gICAgICAgIGlmICh1bml0ID09IFwiS1wiKSB7XHJcbiAgICAgICAgICAgIGRpc3QgPSBkaXN0ICogMS42MDkzNDRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVuaXQgPT0gXCJOXCIpIHtcclxuICAgICAgICAgICAgZGlzdCA9IGRpc3QgKiAwLjg2ODRcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRpc3RcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudExvYyhjYWxsYmFjaykge1xyXG5cclxuICAgICAgICBpZiAobmF2aWdhdG9yICYmIG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xyXG4gICAgICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2xhdC1sb2cnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj4+Pj4+Pj4+Pj4+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0Rpc3RhbmNlQmV0d2VlbmxvY2F0aW9uKHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhdC1sb2cnKSwgcG9zaXRpb24uY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnI+XCIsIGVycm9yKTtcclxuXHJcbiAgICAgICAgICAgIH0sIHt0aW1lb3V0OiAxMDAwMH0pO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24oKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsYXQtbG9nJykgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NsYXQtbG9nJywgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tEaXN0YW5jZUJldHdlZW5sb2NhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjbGF0LWxvZycpICE9PSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgfSAqL1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyPlwiLCBlcnJvcilcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR2VvbG9jYXRpb24gaXMgbm90IHN1cHBvcnRlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRjb2RlKCkge1xyXG4gICAgICAgIHZhciBsYXQsIGxuZyA9ICcnO1xyXG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsYXQtbG9nJykgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbGF0ID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjbGF0LWxvZycpLnNwbGl0KCctLScpWzBdO1xyXG4gICAgICAgICAgICBsbmcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsYXQtbG9nJykuc3BsaXQoJy0tJylbMV07XHJcbiAgICAgICAgICAgIHZhciBnZW9jb2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcjtcclxuICAgICAgICAgICAgdmFyIGxhdGxuZyA9IHtsYXQ6IHBhcnNlRmxvYXQobGF0KSwgbG5nOiBwYXJzZUZsb2F0KGxuZyl9O1xyXG4gICAgICAgICAgICBnZW9jb2Rlci5nZW9jb2RlKHsnbG9jYXRpb24nOiBsYXRsbmd9LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnT0snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRaaXBjb2RlKHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoJ0dlb2NvZGVyIGZhaWxlZCBkdWUgdG86ICcgKyBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WmlwY29kZShwbGFjZSkge1xyXG5cclxuICAgICAgICB2YXIgemlwY29kZXMgPSBbXTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwbGFjZSkpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBwbGFjZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzW2pdID09IFwicG9zdGFsX2NvZGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzW2ldLmxvbmdfbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6aXBjb2Rlcy5wdXNoKHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50c1tpXS5sb25nX25hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzW2pdID09IFwicG9zdGFsX2NvZGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0ubG9uZ19uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgemlwY29kZXMucHVzaChwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0ubG9uZ19uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHppcGNvZGVzKTtcclxuICAgICAgICBpZiAoemlwY29kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N6aXBjb2RlcycsIHppcGNvZGVzKTtcclxuICAgICAgICAgICAgLy9TdG9yZSBpbiBJbmRleERCXHJcbiAgICAgICAgICAgIC8vIHN0b3JlLnN0b3JlaW5JZGIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUN1cnJlbnRMb2NhdGlvbigpIHtcclxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkZXZpY2VUb2tlbicpICE9PSBudWxsICYmIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmZXRjaCgnL2FwaS93aGVyZWlhbScsIHttZXRob2Q6ICdwb3N0JywgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXRsbmc6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSxcclxuICAgICAgICAgICAgICAgICAgICBwemlwY29kZXM6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHppcGNvZGVzJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJpZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RldmljZVRva2VuJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhqc29uKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbXlTdWJzY3JpYmVyKG1zZywgZGF0YSkge1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY2Nlc3NUb2tlbicsIGRhdGEudG9rZW4pO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJpZCcsIGRhdGEudXNlcmlkKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpc0xvZ2dlZEluJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aC5hY3RpdmVJbnRlcnZhbCh0aGlzLnByb3BzLmhpc3RvcnkpO1xyXG4gICAgICAgICAgICAvLyAgIHRoaXMuc2F2ZUN1cnJlbnRMb2NhdGlvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYWNjZXNzVG9rZW4nKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VyaWQnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdpc0xvZ2dlZEluJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aC5zdG9wSW50ZXJ2YWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0xvZ2dlZEluKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgaXNMb2dnZWRJbihkYXRhKSB7XHJcbiAgICAgICAgdmFyIGJvb2xGbGFnID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0xvZ2dlZEluJyk7XHJcbiAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ2NhbGxiYWNrJykpIHtcclxuICAgICAgICAgICAgZGF0YS5jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFkYXRhLnN0YXR1cykge1xyXG4gICAgICAgICAgICBQdWJTdWIucHVibGlzaCgnSVNfTE9HT1VUJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNMb2dnZWRJbjogKGJvb2xGbGFnICE9PSBudWxsICYmIGJvb2xGbGFnICE9PSAnJykgPyBKU09OLnBhcnNlKGJvb2xGbGFnKSA6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPFJvdXRpbmcgaXNsb2dpbj17dGhpcy5zdGF0ZS5pc0xvZ2dlZElufSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihBcHApO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL0FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///58\n")}});