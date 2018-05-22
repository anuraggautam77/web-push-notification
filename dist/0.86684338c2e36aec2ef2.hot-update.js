webpackHotUpdate(0,{58:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(3);\n\nvar _auth = __webpack_require__(59);\n\nvar _pubsubJs = __webpack_require__(12);\n\nvar _pubsubJs2 = _interopRequireDefault(_pubsubJs);\n\n__webpack_require__(61);\n\nvar _router = __webpack_require__(62);\n\nvar _router2 = _interopRequireDefault(_router);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar App = function (_Component) {\n    _inherits(App, _Component);\n\n    function App(props) {\n        _classCallCheck(this, App);\n\n        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));\n\n        _this.state = { \"isLoggedIn\": window.localStorage.getItem('isLoggedIn') };\n        _this.mySubscriber = _this.mySubscriber.bind(_this);\n        _pubsubJs2.default.subscribe('IS_LOGIN', _this.mySubscriber);\n        _this.auth = new _auth.Auth();\n        if (_this.state.isLoggedIn) {\n            _this.auth.activeInterval(_this.props.history);\n        } else {\n            _this.auth.stopInterval();\n        }\n\n        return _this;\n    }\n\n    _createClass(App, [{\n        key: 'initGeolocation',\n        value: function initGeolocation(callback) {\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position) {\n                    if (window.localStorage.getItem('plat-log') === null) {\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                    }\n                    callback();\n                }, function (error) {\n                    console.log(\"err>\", error);\n                    Da;\n                }, { timeout: 10000 });\n\n                navigator.geolocation.watchPosition(function (position) {\n                    console.log(position.coords.latitude + \"--\" + position.coords.longitude);\n                    if (window.localStorage.getItem('plat-log') !== position.coords.latitude + \"--\" + position.coords.longitude) {\n                        console.log(\">>>Change in address\");\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                });\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n\n            /* this.initGeolocation( ()=> {\r\n             this.getcode();\r\n             });\r\n             */\n\n            this.getCurrentLoc();\n        }\n    }, {\n        key: 'getCurrentLoc',\n        value: function getCurrentLoc() {\n\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position) {\n                    /* if (window.localStorage.getItem('plat-log') === null) {\r\n                         window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\r\n                     }*/\n                    callback();\n                }, function (error) {\n                    console.log(\"err>\", error);\n                    Da;\n                }, { timeout: 10000 });\n\n                navigator.geolocation.watchPosition(function (position) {\n                    console.log(position.coords.latitude + \"--\" + position.coords.longitude);\n                    if (window.localStorage.getItem('plat-log') !== position.coords.latitude + \"--\" + position.coords.longitude) {\n                        console.log(\">>>Change in address\");\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                });\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'getcode',\n        value: function getcode() {\n            var _this2 = this;\n\n            var lat,\n                lng = '';\n            if (window.localStorage.getItem('plat-log') !== null) {\n                lat = window.localStorage.getItem('plat-log').split('--')[0];\n                lng = window.localStorage.getItem('plat-log').split('--')[1];\n                var geocoder = new google.maps.Geocoder();\n                var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };\n                geocoder.geocode({ 'location': latlng }, function (results, status) {\n                    if (status === 'OK') {\n                        _this2.getZipcode(results);\n                    } else {\n                        window.alert('Geocoder failed due to: ' + status);\n                    }\n                });\n            }\n        }\n    }, {\n        key: 'getZipcode',\n        value: function getZipcode(place) {\n\n            var zipcodes = [];\n            if (Array.isArray(place)) {\n                for (var k = 0; k < place.length; k++) {\n                    for (var i = 0; i < place[k].address_components.length; i++) {\n                        for (var j = 0; j < place[k].address_components[i].types.length; j++) {\n                            if (place[k].address_components[i].types[j] == \"postal_code\") {\n                                // console.log(place[k].address_components[i].long_name);\n                                zipcodes.push(place[k].address_components[i].long_name);\n                            }\n                        }\n                    }\n                }\n            } else {\n                for (var i = 0; i < place.address_components.length; i++) {\n                    for (var j = 0; j < place.address_components[i].types.length; j++) {\n                        if (place.address_components[i].types[j] == \"postal_code\") {\n                            // console.log(place.address_components[i].long_name);\n                            zipcodes.push(place.address_components[i].long_name);\n                        }\n                    }\n                }\n            }\n            console.log(zipcodes);\n            if (zipcodes.length > 0) {\n                window.localStorage.setItem('pzipcodes', zipcodes);\n                //Store in IndexDB\n                store.storeinIdb();\n            }\n        }\n    }, {\n        key: 'saveCurrentLocation',\n        value: function saveCurrentLocation() {\n            if (window.localStorage.getItem('deviceToken') !== null && window.localStorage.getItem('plat-log') !== null) {\n                fetch('/api/whereiam', { method: 'post', headers: { 'Content-Type': 'application/json' },\n                    body: JSON.stringify({\n                        platlng: window.localStorage.getItem('plat-log'),\n                        pzipcodes: window.localStorage.getItem('pzipcodes'),\n                        userId: window.localStorage.getItem('userid'),\n                        token: window.localStorage.getItem('deviceToken')\n                    })\n                }).then(function (res) {\n                    return res.json();\n                }).then(function (json) {\n                    console.log(json);\n                });\n            }\n        }\n    }, {\n        key: 'mySubscriber',\n        value: function mySubscriber(msg, data) {\n\n            if (data.status) {\n                window.localStorage.setItem('accessToken', data.token);\n                window.localStorage.setItem('userid', data.userid);\n                window.localStorage.setItem('isLoggedIn', true);\n                this.auth.activeInterval(this.props.history);\n                //   this.saveCurrentLocation();\n            } else {\n                window.localStorage.removeItem('accessToken');\n                window.localStorage.removeItem('userid');\n                window.localStorage.removeItem('isLoggedIn');\n                this.auth.stopInterval();\n            }\n            this.isLoggedIn(data);\n        }\n    }, {\n        key: 'isLoggedIn',\n        value: function isLoggedIn(data) {\n            var boolFlag = window.localStorage.getItem('isLoggedIn');\n            if (data.hasOwnProperty('callback')) {\n                data.callback();\n            }\n\n            if (!data.status) {\n                _pubsubJs2.default.publish('IS_LOGOUT');\n            }\n\n            this.setState({\n                isLoggedIn: boolFlag !== null && boolFlag !== '' ? JSON.parse(boolFlag) : false\n            });\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return _react2.default.createElement(\n                'div',\n                null,\n                _react2.default.createElement(_router2.default, { islogin: this.state.isLoggedIn })\n            );\n        }\n    }]);\n\n    return App;\n}(_react.Component);\n\nexports.default = (0, _reactRouterDom.withRouter)(App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL0FwcC5qcz9hMGY1Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwic3RhdGUiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibXlTdWJzY3JpYmVyIiwiYmluZCIsIlB1YlN1YiIsInN1YnNjcmliZSIsImF1dGgiLCJBdXRoIiwiaXNMb2dnZWRJbiIsImFjdGl2ZUludGVydmFsIiwiaGlzdG9yeSIsInN0b3BJbnRlcnZhbCIsImNhbGxiYWNrIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsInNldEl0ZW0iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsIkRhIiwidGltZW91dCIsIndhdGNoUG9zaXRpb24iLCJnZXRDdXJyZW50TG9jIiwibGF0IiwibG5nIiwic3BsaXQiLCJnZW9jb2RlciIsImdvb2dsZSIsIm1hcHMiLCJHZW9jb2RlciIsImxhdGxuZyIsInBhcnNlRmxvYXQiLCJnZW9jb2RlIiwicmVzdWx0cyIsInN0YXR1cyIsImdldFppcGNvZGUiLCJhbGVydCIsInBsYWNlIiwiemlwY29kZXMiLCJBcnJheSIsImlzQXJyYXkiLCJrIiwibGVuZ3RoIiwiaSIsImFkZHJlc3NfY29tcG9uZW50cyIsImoiLCJ0eXBlcyIsInB1c2giLCJsb25nX25hbWUiLCJzdG9yZSIsInN0b3JlaW5JZGIiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInBsYXRsbmciLCJwemlwY29kZXMiLCJ1c2VySWQiLCJ0b2tlbiIsInRoZW4iLCJyZXMiLCJqc29uIiwibXNnIiwiZGF0YSIsInVzZXJpZCIsInJlbW92ZUl0ZW0iLCJib29sRmxhZyIsImhhc093blByb3BlcnR5IiwicHVibGlzaCIsInNldFN0YXRlIiwicGFyc2UiLCJDb21wb25lbnQiXSwibWFw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QUFMO0FBQ0g7O0FBRUQsZ0JBQUksQ0FBQzBELEtBQUsvQixNQUFWLEVBQWtCO0FBQ2RuQyxtQ0FBT3VFLE9BQVAsQ0FBZSxXQUFmO0FBQ0g7O0FBRUQsaUJBQUtDLFFBQUwsQ0FBYztBQUNWcEUsNEJBQWFpRSxhQUFhLElBQWIsSUFBcUJBLGFBQWEsRUFBbkMsR0FBeUNiLEtBQUtpQixLQUFMLENBQVdKLFFBQVgsQ0FBekMsR0FBZ0U7QUFEbEUsYUFBZDtBQUdIOzs7aUNBQ1E7QUFDTCxtQkFDUTtBQUFBO0FBQUE7QUFDSSw4Q0FBQyxnQkFBRCxJQUFTLFNBQVMsS0FBSzNFLEtBQUwsQ0FBV1UsVUFBN0I7QUFESixhQURSO0FBSUg7Ozs7RUEvTGFzRSxnQjs7a0JBa01ILGdDQUFXbEYsR0FBWCxDIiwiZmlsZSI6IjU4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzLCBDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XHJcbmltcG9ydCB7QXV0aH0gZnJvbSAnLi9jb21tb24vYXV0aCc7XHJcbmltcG9ydCBQdWJTdWIgZnJvbSAncHVic3ViLWpzJztcclxuaW1wb3J0ICcuL3N0eWxlL2Nzcy9BcHAuc2Nzcyc7XHJcbmltcG9ydCBSb3V0aW5nIGZyb20gJy4vcm91dGVyL3JvdXRlcic7XHJcbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1wiaXNMb2dnZWRJblwiOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lzTG9nZ2VkSW4nKX07XHJcbiAgICAgICAgdGhpcy5teVN1YnNjcmliZXIgPSB0aGlzLm15U3Vic2NyaWJlci5iaW5kKHRoaXMpO1xyXG4gICAgICAgIFB1YlN1Yi5zdWJzY3JpYmUoJ0lTX0xPR0lOJywgdGhpcy5teVN1YnNjcmliZXIpO1xyXG4gICAgICAgIHRoaXMuYXV0aCA9IG5ldyBBdXRoKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNMb2dnZWRJbikge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGguYWN0aXZlSW50ZXJ2YWwodGhpcy5wcm9wcy5oaXN0b3J5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmF1dGguc3RvcEludGVydmFsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBpbml0R2VvbG9jYXRpb24oY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAobmF2aWdhdG9yICYmIG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xyXG4gICAgICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGxhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnI+XCIsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIERhXHJcbiAgICAgICAgICAgIH0sIHt0aW1lb3V0OiAxMDAwMH0pO1xyXG5cclxuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24oKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSAhPT0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPj4+Q2hhbmdlIGluIGFkZHJlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwbGF0LWxvZycsIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyPlwiLCBlcnJvcilcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR2VvbG9jYXRpb24gaXMgbm90IHN1cHBvcnRlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuXHJcbiAgICAgICAgLyogdGhpcy5pbml0R2VvbG9jYXRpb24oICgpPT4ge1xyXG4gICAgICAgICB0aGlzLmdldGNvZGUoKTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgICAgICovXHJcblxyXG5cclxuICAgICAgICB0aGlzLmdldEN1cnJlbnRMb2MoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudExvYygpIHtcclxuXHJcbiAgICAgICAgaWYgKG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocG9zaXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgLyogaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGxhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycj5cIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgRGFcclxuICAgICAgICAgICAgfSwge3RpbWVvdXQ6IDEwMDAwfSk7XHJcblxyXG4gICAgICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbigocG9zaXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpXHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF0LWxvZycpICE9PSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCI+Pj5DaGFuZ2UgaW4gYWRkcmVzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BsYXQtbG9nJywgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnI+XCIsIGVycm9yKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Y29kZSgpIHtcclxuICAgICAgICB2YXIgbGF0LCBsbmcgPSAnJztcclxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF0LWxvZycpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxhdCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKS5zcGxpdCgnLS0nKVswXTtcclxuICAgICAgICAgICAgbG5nID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF0LWxvZycpLnNwbGl0KCctLScpWzFdO1xyXG4gICAgICAgICAgICB2YXIgZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXI7XHJcbiAgICAgICAgICAgIHZhciBsYXRsbmcgPSB7bGF0OiBwYXJzZUZsb2F0KGxhdCksIGxuZzogcGFyc2VGbG9hdChsbmcpfTtcclxuICAgICAgICAgICAgZ2VvY29kZXIuZ2VvY29kZSh7J2xvY2F0aW9uJzogbGF0bG5nfSwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ09LJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0WmlwY29kZShyZXN1bHRzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KCdHZW9jb2RlciBmYWlsZWQgZHVlIHRvOiAnICsgc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFppcGNvZGUocGxhY2UpIHtcclxuXHJcbiAgICAgICAgdmFyIHppcGNvZGVzID0gW107XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGxhY2UpKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgcGxhY2UubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlc1tqXSA9PSBcInBvc3RhbF9jb2RlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50c1tpXS5sb25nX25hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgemlwY29kZXMucHVzaChwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHNbaV0ubG9uZ19uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlc1tqXSA9PSBcInBvc3RhbF9jb2RlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLmxvbmdfbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHppcGNvZGVzLnB1c2gocGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLmxvbmdfbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh6aXBjb2Rlcyk7XHJcbiAgICAgICAgaWYgKHppcGNvZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwemlwY29kZXMnLCB6aXBjb2Rlcyk7XHJcbiAgICAgICAgICAgIC8vU3RvcmUgaW4gSW5kZXhEQlxyXG4gICAgICAgICAgICBzdG9yZS5zdG9yZWluSWRiKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVDdXJyZW50TG9jYXRpb24oKSB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGV2aWNlVG9rZW4nKSAhPT0gbnVsbCAmJiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgZmV0Y2goJy9hcGkvd2hlcmVpYW0nLCB7bWV0aG9kOiAncG9zdCcsIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF0bG5nOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJyksXHJcbiAgICAgICAgICAgICAgICAgICAgcHppcGNvZGVzOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3B6aXBjb2RlcycpLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyaWQnKSxcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkZXZpY2VUb2tlbicpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coanNvbik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG15U3Vic2NyaWJlcihtc2csIGRhdGEpIHtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWNjZXNzVG9rZW4nLCBkYXRhLnRva2VuKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyaWQnLCBkYXRhLnVzZXJpZCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNMb2dnZWRJbicsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmF1dGguYWN0aXZlSW50ZXJ2YWwodGhpcy5wcm9wcy5oaXN0b3J5KTtcclxuICAgICAgICAgICAgLy8gICB0aGlzLnNhdmVDdXJyZW50TG9jYXRpb24oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FjY2Vzc1Rva2VuJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcmlkJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnaXNMb2dnZWRJbicpO1xyXG4gICAgICAgICAgICB0aGlzLmF1dGguc3RvcEludGVydmFsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNMb2dnZWRJbihkYXRhKTtcclxuICAgIH1cclxuICAgIGlzTG9nZ2VkSW4oZGF0YSkge1xyXG4gICAgICAgIHZhciBib29sRmxhZyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaXNMb2dnZWRJbicpO1xyXG4gICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdjYWxsYmFjaycpKSB7XHJcbiAgICAgICAgICAgIGRhdGEuY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghZGF0YS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgUHViU3ViLnB1Ymxpc2goJ0lTX0xPR09VVCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzTG9nZ2VkSW46IChib29sRmxhZyAhPT0gbnVsbCAmJiBib29sRmxhZyAhPT0gJycpID8gSlNPTi5wYXJzZShib29sRmxhZykgOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3V0aW5nIGlzbG9naW49e3RoaXMuc3RhdGUuaXNMb2dnZWRJbn0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoQXBwKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9BcHAuanMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///58\n")}});