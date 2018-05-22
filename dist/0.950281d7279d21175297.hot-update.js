webpackHotUpdate(0,{58:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(3);\n\nvar _auth = __webpack_require__(59);\n\nvar _pubsubJs = __webpack_require__(12);\n\nvar _pubsubJs2 = _interopRequireDefault(_pubsubJs);\n\n__webpack_require__(61);\n\nvar _router = __webpack_require__(62);\n\nvar _router2 = _interopRequireDefault(_router);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar App = function (_Component) {\n    _inherits(App, _Component);\n\n    function App(props) {\n        _classCallCheck(this, App);\n\n        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));\n\n        _this.state = { \"isLoggedIn\": window.localStorage.getItem('isLoggedIn') };\n        _this.mySubscriber = _this.mySubscriber.bind(_this);\n        _pubsubJs2.default.subscribe('IS_LOGIN', _this.mySubscriber);\n        _this.auth = new _auth.Auth();\n        if (_this.state.isLoggedIn) {\n            _this.auth.activeInterval(_this.props.history);\n        } else {\n            _this.auth.stopInterval();\n        }\n\n        return _this;\n    }\n\n    _createClass(App, [{\n        key: 'initGeolocation',\n        value: function initGeolocation(callback) {\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position) {\n                    if (window.localStorage.getItem('plat-log') === null) {\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                    }\n                    callback();\n                }, function (error) {\n                    console.log(\"err>\", error);\n                }, { timeout: 10000 });\n\n                navigator.geolocation.watchPosition(function (position) {\n                    console.log(position.coords.latitude + \"--\" + position.coords.longitude);\n                    if (window.localStorage.getItem('plat-log') !== position.coords.latitude + \"--\" + position.coords.longitude) {\n                        console.log(\">>>Change in address\");\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                });\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n\n            /* this.initGeolocation( ()=> {\r\n             this.getcode();\r\n             });\r\n             */\n\n            this.getCurrentLoc(function () {\n                //this.getPostalCode();\n            });\n        }\n    }, {\n        key: 'checkDistanceBetweenlocation',\n        value: function checkDistanceBetweenlocation(oldloc, newloc) {\n\n            var lat1 = oldloc.split(\"--\")[0];\n            var lon1 = oldloc.split(\"--\")[1];\n\n            var lat2 = newloc.latitude;\n            var lon2 = newloc.longitude;\n\n            var radlat1 = Math.PI * lat1 / 180;\n            var radlat2 = Math.PI * lat2 / 180;\n            var radlon1 = Math.PI * lon1 / 180;\n            var radlon2 = Math.PI * lon2 / 180;\n            var theta = lon1 - lon2;\n            var radtheta = Math.PI * theta / 180;\n            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);\n            dist = Math.acos(dist);\n            dist = dist * 180 / Math.PI;\n            dist = dist * 60 * 1.1515;\n            if (unit == \"K\") {\n                dist = dist * 1.609344;\n            }\n            if (unit == \"N\") {\n                dist = dist * 0.8684;\n            }\n            return dist;\n        }\n    }, {\n        key: 'getCurrentLoc',\n        value: function getCurrentLoc(callback) {\n            var _this2 = this;\n\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position) {\n                    if (window.localStorage.getItem('clat-log') === null) {\n                        window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    } else {\n                        console.log(\">>>>>>>>>>>\");\n                        _this2.checkDistanceBetweenlocation(window.localStorage.setItem('clat-log'), position.coords);\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                }, { timeout: 10000 });\n\n                navigator.geolocation.watchPosition(function (position) {\n                    console.log(position.coords.latitude + \"--\" + position.coords.longitude);\n\n                    if (window.localStorage.getItem('clat-log') === null) {\n                        window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    } else {\n\n                        _this2.checkDistanceBetweenlocation();\n\n                        /*\r\n                         if (window.localStorage.getItem('clat-log') !== position.coords.latitude + \"--\" + position.coords.longitude) {\r\n                         window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\r\n                         } */\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                });\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'getcode',\n        value: function getcode() {\n            var _this3 = this;\n\n            var lat,\n                lng = '';\n            if (window.localStorage.getItem('clat-log') !== null) {\n                lat = window.localStorage.getItem('clat-log').split('--')[0];\n                lng = window.localStorage.getItem('clat-log').split('--')[1];\n                var geocoder = new google.maps.Geocoder();\n                var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };\n                geocoder.geocode({ 'location': latlng }, function (results, status) {\n                    if (status === 'OK') {\n                        _this3.getZipcode(results);\n                    } else {\n                        window.alert('Geocoder failed due to: ' + status);\n                    }\n                });\n            }\n        }\n    }, {\n        key: 'getZipcode',\n        value: function getZipcode(place) {\n\n            var zipcodes = [];\n            if (Array.isArray(place)) {\n                for (var k = 0; k < place.length; k++) {\n                    for (var i = 0; i < place[k].address_components.length; i++) {\n                        for (var j = 0; j < place[k].address_components[i].types.length; j++) {\n                            if (place[k].address_components[i].types[j] == \"postal_code\") {\n                                // console.log(place[k].address_components[i].long_name);\n                                zipcodes.push(place[k].address_components[i].long_name);\n                            }\n                        }\n                    }\n                }\n            } else {\n                for (var i = 0; i < place.address_components.length; i++) {\n                    for (var j = 0; j < place.address_components[i].types.length; j++) {\n                        if (place.address_components[i].types[j] == \"postal_code\") {\n                            // console.log(place.address_components[i].long_name);\n                            zipcodes.push(place.address_components[i].long_name);\n                        }\n                    }\n                }\n            }\n            console.log(zipcodes);\n            if (zipcodes.length > 0) {\n                window.localStorage.setItem('czipcodes', zipcodes);\n                //Store in IndexDB\n                // store.storeinIdb();\n            }\n        }\n    }, {\n        key: 'saveCurrentLocation',\n        value: function saveCurrentLocation() {\n            if (window.localStorage.getItem('deviceToken') !== null && window.localStorage.getItem('plat-log') !== null) {\n                fetch('/api/whereiam', { method: 'post', headers: { 'Content-Type': 'application/json' },\n                    body: JSON.stringify({\n                        platlng: window.localStorage.getItem('plat-log'),\n                        pzipcodes: window.localStorage.getItem('pzipcodes'),\n                        userId: window.localStorage.getItem('userid'),\n                        token: window.localStorage.getItem('deviceToken')\n                    })\n                }).then(function (res) {\n                    return res.json();\n                }).then(function (json) {\n                    console.log(json);\n                });\n            }\n        }\n    }, {\n        key: 'mySubscriber',\n        value: function mySubscriber(msg, data) {\n\n            if (data.status) {\n                window.localStorage.setItem('accessToken', data.token);\n                window.localStorage.setItem('userid', data.userid);\n                window.localStorage.setItem('isLoggedIn', true);\n                this.auth.activeInterval(this.props.history);\n                //   this.saveCurrentLocation();\n            } else {\n                window.localStorage.removeItem('accessToken');\n                window.localStorage.removeItem('userid');\n                window.localStorage.removeItem('isLoggedIn');\n                this.auth.stopInterval();\n            }\n            this.isLoggedIn(data);\n        }\n    }, {\n        key: 'isLoggedIn',\n        value: function isLoggedIn(data) {\n            var boolFlag = window.localStorage.getItem('isLoggedIn');\n            if (data.hasOwnProperty('callback')) {\n                data.callback();\n            }\n\n            if (!data.status) {\n                _pubsubJs2.default.publish('IS_LOGOUT');\n            }\n\n            this.setState({\n                isLoggedIn: boolFlag !== null && boolFlag !== '' ? JSON.parse(boolFlag) : false\n            });\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return _react2.default.createElement(\n                'div',\n                null,\n                _react2.default.createElement(_router2.default, { islogin: this.state.isLoggedIn })\n            );\n        }\n    }]);\n\n    return App;\n}(_react.Component);\n\nexports.default = (0, _reactRouterDom.withRouter)(App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL0FwcC5qcz9hMGY1Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwic3RhdGUiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibXlTdWJzY3JpYmVyIiwiYmluZCIsIlB1YlN1YiIsInN1YnNjcmliZSIsImF1dGgiLCJBdXRoIiwiaXNMb2dnZWRJbiIsImFjdGl2ZUludGVydmFsIiwiaGlzdG9yeSIsInN0b3BJbnRlcnZhbCIsImNhbGxiYWNrIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsInNldEl0ZW0iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInRpbWVvdXQiLCJ3YXRjaFBvc2l0aW9uIiwiZ2V0Q3VycmVudExvYyIsIm9sZGxvYyIsIm5ld2xvYyIsImxhdDEiLCJzcGxpdCIsImxvbjEiLCJsYXQyIiwibG9uMiIsInJhZGxhdDEiLCJNYXRoIiwiUEkiLCJyYWRsYXQyIiwicmFkbG9uMSIsInJhZGxvbjIiLCJ0aGV0YSIsInJhZHRoZXRhIiwiZGlzdCIsInNpbiIsImNvcyIsImFjb3MiLCJ1bml0IiwiY2hlY2tEaXN0YW5jZUJldHdlZW5sb2NhdGlvbiIsImxhdCIsImxuZyIsImdlb2NvZGVyIiwiZ29vZ2xlIiwibWFwcyIsIkdlb2NvZGVyIiwibGF0bG5nIiwicGFyc2VGbG9hdCIsImdlb2NvZGUiLCJyZXN1bHRzIiwic3RhdHVzIiwiZ2V0WmlwY29kZSIsImFsZXJ0IiwicGxhY2UiLCJ6aXBjb2RlcyIsIkFycmF5IiwiaXNBcnJheSIsImsiLCJsZW5ndGgiLCJpIiwiYWRkcmVzc19jb21wb25lbnRzIiwiaiIsInR5cGVzIiwicHVzaCIsImxvbmdfbmFtZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicGxhdGxuZyIsInB6aXBjb2RlcyIsInVzZXJJZCIsInRva2VuIiwidGhlbiIsInJlcyIsImpzb24iLCJtc2ciLCJkYXRhIiwidXNlcmlkIiwicmVtb3ZlSXRlbSIsImJvb2xGbGFnIiwiaGFzT3duUHJvcGVydHkiLCJwdWJsaXNoIiwic2V0U3RhdGUiLCJwYXJzZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNNQSxHOzs7QUFDRixpQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLDhHQUNUQSxLQURTOztBQUVmLGNBQUtDLEtBQUwsR0FBYSxFQUFDLGNBQWNDLE9BQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFlBQTVCLENBQWYsRUFBYjtBQUNBLGNBQUtDLFlBQUwsR0FBb0IsTUFBS0EsWUFBTCxDQUFrQkMsSUFBbEIsT0FBcEI7QUFDQUMsMkJBQU9DLFNBQVAsQ0FBaUIsVUFBakIsRUFBNkIsTUFBS0gsWUFBbEM7QUFDQSxjQUFLSSxJQUFMLEdBQVksSUFBSUMsVUFBSixFQUFaO0FBQ0EsWUFBSSxNQUFLVCxLQUFMLENBQVdVLFVBQWYsRUFBMkI7QUFDdkIsa0JBQUtGLElBQUwsQ0FBVUcsY0FBVixDQUF5QixNQUFLWixLQUFMLENBQVdhLE9BQXBDO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsa0JBQUtKLElBQUwsQ0FBVUssWUFBVjtBQUNIOztBQVZjO0FBWWxCOzs7O3dDQUVlQyxRLEVBQVU7QUFDdEIsZ0JBQUlDLGFBQWFBLFVBQVVDLFdBQTNCLEVBQXdDO0FBQ3BDRCwwQkFBVUMsV0FBVixDQUFzQkMsa0JBQXRCLENBQXlDLFVBQUNDLFFBQUQsRUFBYztBQUNuRCx3QkFBSWpCLE9BQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFVBQTVCLE1BQTRDLElBQWhELEVBQXNEO0FBQ2xERiwrQkFBT0MsWUFBUCxDQUFvQmlCLE9BQXBCLENBQTRCLFVBQTVCLEVBQXdDRCxTQUFTRSxNQUFULENBQWdCQyxRQUFo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T0MsWUFBUCxDQUFvQmlCLE9BQXBCLENBQTRCLFlBQTVCLEVBQTBDLElBQTFDO0FBQ0EscUJBQUtYLElBQUwsQ0FBVUcsY0FBVixDQUF5QixLQUFLWixLQUFMLENBQVdhLE9BQXBDO0FBQ0E7QUFDSCxhQU5ELE1BTU87QUFDSFgsdUJBQU9DLFlBQVAsQ0FBb0J5RixVQUFwQixDQUErQixhQUEvQjtBQUNBMUYsdUJBQU9DLFlBQVAsQ0FBb0J5RixVQUFwQixDQUErQixRQUEvQjtBQUNBMUYsdUJBQU9DLFlBQVAsQ0FBb0J5RixVQUFwQixDQUErQixZQUEvQjtBQUNBLHFCQUFLbkYsSUFBTCxDQUFVSyxZQUFWO0FBQ0g7QUFDRCxpQkFBS0gsVUFBTCxDQUFnQitFLElBQWhCO0FBQ0g7OzttQ0FDVUEsSSxFQUFNO0FBQ2IsZ0JBQUlHLFdBQVczRixPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixZQUE1QixDQUFmO0FBQ0EsZ0JBQUlzRixLQUFLSSxjQUFMLENBQW9CLFVBQXBCLENBQUosRUFBcUM7QUFDakNKLHFCQUFLM0UsUUFBTDtBQUNIOztBQUVELGdCQUFJLENBQUMyRSxLQUFLN0IsTUFBVixFQUFrQjtBQUNkdEQsbUNBQU93RixPQUFQLENBQWUsV0FBZjtBQUNIOztBQUVELGlCQUFLQyxRQUFMLENBQWM7QUFDVnJGLDRCQUFha0YsYUFBYSxJQUFiLElBQXFCQSxhQUFhLEVBQW5DLEdBQXlDYixLQUFLaUIsS0FBTCxDQUFXSixRQUFYLENBQXpDLEdBQWdFO0FBRGxFLGFBQWQ7QUFHSDs7O2lDQUNRO0FBQ0wsbUJBQ1E7QUFBQTtBQUFBO0FBQ0ksOENBQUMsZ0JBQUQsSUFBUyxTQUFTLEtBQUs1RixLQUFMLENBQVdVLFVBQTdCO0FBREosYUFEUjtBQUlIOzs7O0VBaFBhdUYsZ0I7O2tCQW1QSCxnQ0FBV25HLEdBQVgsQyIsImZpbGUiOiI1OC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlcywgQ29tcG9uZW50fSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5pbXBvcnQge0F1dGh9IGZyb20gJy4vY29tbW9uL2F1dGgnO1xyXG5pbXBvcnQgUHViU3ViIGZyb20gJ3B1YnN1Yi1qcyc7XHJcbmltcG9ydCAnLi9zdHlsZS9jc3MvQXBwLnNjc3MnO1xyXG5pbXBvcnQgUm91dGluZyBmcm9tICcuL3JvdXRlci9yb3V0ZXInO1xyXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcImlzTG9nZ2VkSW5cIjogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0xvZ2dlZEluJyl9O1xyXG4gICAgICAgIHRoaXMubXlTdWJzY3JpYmVyID0gdGhpcy5teVN1YnNjcmliZXIuYmluZCh0aGlzKTtcclxuICAgICAgICBQdWJTdWIuc3Vic2NyaWJlKCdJU19MT0dJTicsIHRoaXMubXlTdWJzY3JpYmVyKTtcclxuICAgICAgICB0aGlzLmF1dGggPSBuZXcgQXV0aCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzTG9nZ2VkSW4pIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLmFjdGl2ZUludGVydmFsKHRoaXMucHJvcHMuaGlzdG9yeSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEdlb2xvY2F0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocG9zaXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BsYXQtbG9nJywgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyPlwiLCBlcnJvcik7XHJcblxyXG4gICAgICAgICAgICB9LCB7dGltZW91dDogMTAwMDB9KTtcclxuXHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSlcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykgIT09IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj4+PkNoYW5nZSBpbiBhZGRyZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGxhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycj5cIiwgZXJyb3IpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcblxyXG4gICAgICAgIC8qIHRoaXMuaW5pdEdlb2xvY2F0aW9uKCAoKT0+IHtcclxuICAgICAgICAgdGhpcy5nZXRjb2RlKCk7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgICAqL1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5nZXRDdXJyZW50TG9jKCgpID0+IHtcclxuICAgICAgICAgICAgLy90aGlzLmdldFBvc3RhbENvZGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tEaXN0YW5jZUJldHdlZW5sb2NhdGlvbihvbGRsb2MsIG5ld2xvYykge1xyXG5cclxuICAgICAgICBsZXQgbGF0MSA9IG9sZGxvYy5zcGxpdChcIi0tXCIpWzBdO1xyXG4gICAgICAgIGxldCBsb24xID0gb2xkbG9jLnNwbGl0KFwiLS1cIilbMV07XHJcblxyXG4gICAgICAgIGxldCBsYXQyID0gbmV3bG9jLmxhdGl0dWRlO1xyXG4gICAgICAgIGxldCBsb24yID0gbmV3bG9jLmxvbmdpdHVkZTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgdmFyIHJhZGxhdDEgPSBNYXRoLlBJICogbGF0MSAvIDE4MFxyXG4gICAgICAgIHZhciByYWRsYXQyID0gTWF0aC5QSSAqIGxhdDIgLyAxODBcclxuICAgICAgICB2YXIgcmFkbG9uMSA9IE1hdGguUEkgKiBsb24xIC8gMTgwXHJcbiAgICAgICAgdmFyIHJhZGxvbjIgPSBNYXRoLlBJICogbG9uMiAvIDE4MFxyXG4gICAgICAgIHZhciB0aGV0YSA9IGxvbjEgLSBsb24yXHJcbiAgICAgICAgdmFyIHJhZHRoZXRhID0gTWF0aC5QSSAqIHRoZXRhIC8gMTgwXHJcbiAgICAgICAgdmFyIGRpc3QgPSBNYXRoLnNpbihyYWRsYXQxKSAqIE1hdGguc2luKHJhZGxhdDIpICsgTWF0aC5jb3MocmFkbGF0MSkgKiBNYXRoLmNvcyhyYWRsYXQyKSAqIE1hdGguY29zKHJhZHRoZXRhKTtcclxuICAgICAgICBkaXN0ID0gTWF0aC5hY29zKGRpc3QpXHJcbiAgICAgICAgZGlzdCA9IGRpc3QgKiAxODAgLyBNYXRoLlBJXHJcbiAgICAgICAgZGlzdCA9IGRpc3QgKiA2MCAqIDEuMTUxNVxyXG4gICAgICAgIGlmICh1bml0ID09IFwiS1wiKSB7XHJcbiAgICAgICAgICAgIGRpc3QgPSBkaXN0ICogMS42MDkzNDRcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVuaXQgPT0gXCJOXCIpIHtcclxuICAgICAgICAgICAgZGlzdCA9IGRpc3QgKiAwLjg2ODRcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRpc3RcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudExvYyhjYWxsYmFjaykge1xyXG5cclxuICAgICAgICBpZiAobmF2aWdhdG9yICYmIG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xyXG4gICAgICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2xhdC1sb2cnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj4+Pj4+Pj4+Pj4+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0Rpc3RhbmNlQmV0d2VlbmxvY2F0aW9uKHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhdC1sb2cnKSwgcG9zaXRpb24uY29vcmRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnI+XCIsIGVycm9yKTtcclxuXHJcbiAgICAgICAgICAgIH0sIHt0aW1lb3V0OiAxMDAwMH0pO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24oKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsYXQtbG9nJykgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NsYXQtbG9nJywgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tEaXN0YW5jZUJldHdlZW5sb2NhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjbGF0LWxvZycpICE9PSBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgfSAqL1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyPlwiLCBlcnJvcilcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR2VvbG9jYXRpb24gaXMgbm90IHN1cHBvcnRlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRjb2RlKCkge1xyXG4gICAgICAgIHZhciBsYXQsIGxuZyA9ICcnO1xyXG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsYXQtbG9nJykgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbGF0ID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjbGF0LWxvZycpLnNwbGl0KCctLScpWzBdO1xyXG4gICAgICAgICAgICBsbmcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsYXQtbG9nJykuc3BsaXQoJy0tJylbMV07XHJcbiAgICAgICAgICAgIHZhciBnZW9jb2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcjtcclxuICAgICAgICAgICAgdmFyIGxhdGxuZyA9IHtsYXQ6IHBhcnNlRmxvYXQobGF0KSwgbG5nOiBwYXJzZUZsb2F0KGxuZyl9O1xyXG4gICAgICAgICAgICBnZW9jb2Rlci5nZW9jb2RlKHsnbG9jYXRpb24nOiBsYXRsbmd9LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnT0snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRaaXBjb2RlKHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoJ0dlb2NvZGVyIGZhaWxlZCBkdWUgdG86ICcgKyBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0WmlwY29kZShwbGFjZSkge1xyXG5cclxuICAgICAgICB2YXIgemlwY29kZXMgPSBbXTtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwbGFjZSkpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBwbGFjZS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzW2pdID09IFwicG9zdGFsX2NvZGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzW2ldLmxvbmdfbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6aXBjb2Rlcy5wdXNoKHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50c1tpXS5sb25nX25hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzW2pdID09IFwicG9zdGFsX2NvZGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0ubG9uZ19uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgemlwY29kZXMucHVzaChwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0ubG9uZ19uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHppcGNvZGVzKTtcclxuICAgICAgICBpZiAoemlwY29kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N6aXBjb2RlcycsIHppcGNvZGVzKTtcclxuICAgICAgICAgICAgLy9TdG9yZSBpbiBJbmRleERCXHJcbiAgICAgICAgICAgIC8vIHN0b3JlLnN0b3JlaW5JZGIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUN1cnJlbnRMb2NhdGlvbigpIHtcclxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkZXZpY2VUb2tlbicpICE9PSBudWxsICYmIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmZXRjaCgnL2FwaS93aGVyZWlhbScsIHttZXRob2Q6ICdwb3N0JywgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXRsbmc6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSxcclxuICAgICAgICAgICAgICAgICAgICBwemlwY29kZXM6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHppcGNvZGVzJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJpZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RldmljZVRva2VuJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhqc29uKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbXlTdWJzY3JpYmVyKG1zZywgZGF0YSkge1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY2Nlc3NUb2tlbicsIGRhdGEudG9rZW4pO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJpZCcsIGRhdGEudXNlcmlkKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpc0xvZ2dlZEluJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aC5hY3RpdmVJbnRlcnZhbCh0aGlzLnByb3BzLmhpc3RvcnkpO1xyXG4gICAgICAgICAgICAvLyAgIHRoaXMuc2F2ZUN1cnJlbnRMb2NhdGlvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYWNjZXNzVG9rZW4nKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VyaWQnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdpc0xvZ2dlZEluJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aC5zdG9wSW50ZXJ2YWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0xvZ2dlZEluKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgaXNMb2dnZWRJbihkYXRhKSB7XHJcbiAgICAgICAgdmFyIGJvb2xGbGFnID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0xvZ2dlZEluJyk7XHJcbiAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ2NhbGxiYWNrJykpIHtcclxuICAgICAgICAgICAgZGF0YS5jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFkYXRhLnN0YXR1cykge1xyXG4gICAgICAgICAgICBQdWJTdWIucHVibGlzaCgnSVNfTE9HT1VUJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNMb2dnZWRJbjogKGJvb2xGbGFnICE9PSBudWxsICYmIGJvb2xGbGFnICE9PSAnJykgPyBKU09OLnBhcnNlKGJvb2xGbGFnKSA6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPFJvdXRpbmcgaXNsb2dpbj17dGhpcy5zdGF0ZS5pc0xvZ2dlZElufSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihBcHApO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL0FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///58\n")}});