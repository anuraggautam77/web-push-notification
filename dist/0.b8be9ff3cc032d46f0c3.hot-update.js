webpackHotUpdate(0,{58:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(3);\n\nvar _auth = __webpack_require__(59);\n\nvar _pubsubJs = __webpack_require__(12);\n\nvar _pubsubJs2 = _interopRequireDefault(_pubsubJs);\n\n__webpack_require__(61);\n\nvar _router = __webpack_require__(62);\n\nvar _router2 = _interopRequireDefault(_router);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar App = function (_Component) {\n    _inherits(App, _Component);\n\n    function App(props) {\n        _classCallCheck(this, App);\n\n        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));\n\n        _this.state = {\n            \"isLoggedIn\": window.localStorage.getItem('isLoggedIn'),\n            \"unit\": \"K\", // 'M' is statute miles (default) , 'K' is kilometers  , 'N' is nautical miles\n            \"differ\": 20\n        };\n        _this.mySubscriber = _this.mySubscriber.bind(_this);\n        _pubsubJs2.default.subscribe('IS_LOGIN', _this.mySubscriber);\n        _this.auth = new _auth.Auth();\n        if (_this.state.isLoggedIn) {\n            _this.auth.activeInterval(_this.props.history);\n        } else {\n            _this.auth.stopInterval();\n        }\n\n        return _this;\n    }\n\n    _createClass(App, [{\n        key: 'initGeolocation',\n        value: function initGeolocation(callback) {\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position) {\n                    if (window.localStorage.getItem('plat-log') === null) {\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                    }\n                    callback();\n                }, function (error) {\n                    console.log(\"err>\", error);\n                }, { timeout: 10000 });\n\n                navigator.geolocation.watchPosition(function (position) {\n                    console.log(position.coords.latitude + \"--\" + position.coords.longitude);\n                    if (window.localStorage.getItem('plat-log') !== position.coords.latitude + \"--\" + position.coords.longitude) {\n                        console.log(\">>>Change in address\");\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                });\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n\n            /* this.initGeolocation( ()=> {\r\n             this.getcode();\r\n             });\r\n             */\n\n            this.getCurrentLoc(function () {\n                //this.getPostalCode();\n            });\n        }\n    }, {\n        key: 'checkDistanceBetweenlocation',\n        value: function checkDistanceBetweenlocation(oldloc, newloc) {\n\n            var lat1 = oldloc.split(\"--\")[0];\n            var lon1 = oldloc.split(\"--\")[1];\n\n            var lat2 = newloc.latitude;\n            var lon2 = newloc.longitude;\n\n            var radlat1 = Math.PI * lat1 / 180;\n            var radlat2 = Math.PI * lat2 / 180;\n            //  var radlon1 = Math.PI * lon1 / 180\n            // var radlon2 = Math.PI * lon2 / 180\n            var theta = lon1 - lon2;\n            var radtheta = Math.PI * theta / 180;\n            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);\n            dist = Math.acos(dist);\n            dist = dist * 180 / Math.PI;\n            dist = dist * 60 * 1.1515;\n            if (this.state.unit === \"K\") {\n                dist = dist * 1.609344;\n            }\n            if (this.state.unit === \"N\") {\n                dist = dist * 0.8684;\n            }\n            console.log(dist);\n\n            return dist;\n        }\n    }, {\n        key: 'getCurrentLoc',\n        value: function getCurrentLoc(callback) {\n            var _this2 = this;\n\n            var distance;\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position) {\n                    if (window.localStorage.getItem('clat-log') === null) {\n                        window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    } else {\n                        console.log(\">>>>>>>>>>>\");\n                        distance = _this2.checkDistanceBetweenlocation(window.localStorage.getItem('clat-log'), position.coords);\n                        console.log(distance);\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                }, { timeout: 10000 });\n\n                navigator.geolocation.watchPosition(function (position) {\n                    console.log(position.coords.latitude + \"--\" + position.coords.longitude);\n\n                    if (window.localStorage.getItem('clat-log') === null) {\n                        window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    } else {\n\n                        distance = _this2.checkDistanceBetweenlocation(window.localStorage.getItem('clat-log'), position.coords);\n                        console.log(distance);\n\n                        /*\r\n                         if (window.localStorage.getItem('clat-log') !== position.coords.latitude + \"--\" + position.coords.longitude) {\r\n                         window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\r\n                         } */\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                });\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'getcode',\n        value: function getcode() {\n            var _this3 = this;\n\n            var lat,\n                lng = '';\n            if (window.localStorage.getItem('clat-log') !== null) {\n                lat = window.localStorage.getItem('clat-log').split('--')[0];\n                lng = window.localStorage.getItem('clat-log').split('--')[1];\n                var geocoder = new google.maps.Geocoder();\n                var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };\n                geocoder.geocode({ 'location': latlng }, function (results, status) {\n                    if (status === 'OK') {\n                        _this3.getZipcode(results);\n                    } else {\n                        window.alert('Geocoder failed due to: ' + status);\n                    }\n                });\n            }\n        }\n    }, {\n        key: 'getZipcode',\n        value: function getZipcode(place) {\n\n            var zipcodes = [];\n            if (Array.isArray(place)) {\n                for (var k = 0; k < place.length; k++) {\n                    for (var i = 0; i < place[k].address_components.length; i++) {\n                        for (var j = 0; j < place[k].address_components[i].types.length; j++) {\n                            if (place[k].address_components[i].types[j] == \"postal_code\") {\n                                // console.log(place[k].address_components[i].long_name);\n                                zipcodes.push(place[k].address_components[i].long_name);\n                            }\n                        }\n                    }\n                }\n            } else {\n                for (var i = 0; i < place.address_components.length; i++) {\n                    for (var j = 0; j < place.address_components[i].types.length; j++) {\n                        if (place.address_components[i].types[j] == \"postal_code\") {\n                            // console.log(place.address_components[i].long_name);\n                            zipcodes.push(place.address_components[i].long_name);\n                        }\n                    }\n                }\n            }\n            console.log(zipcodes);\n            if (zipcodes.length > 0) {\n                window.localStorage.setItem('czipcodes', zipcodes);\n                //Store in IndexDB\n                // store.storeinIdb();\n            }\n        }\n    }, {\n        key: 'saveCurrentLocation',\n        value: function saveCurrentLocation() {\n            if (window.localStorage.getItem('deviceToken') !== null && window.localStorage.getItem('plat-log') !== null) {\n                fetch('/api/whereiam', { method: 'post', headers: { 'Content-Type': 'application/json' },\n                    body: JSON.stringify({\n                        platlng: window.localStorage.getItem('plat-log'),\n                        pzipcodes: window.localStorage.getItem('pzipcodes'),\n                        userId: window.localStorage.getItem('userid'),\n                        token: window.localStorage.getItem('deviceToken')\n                    })\n                }).then(function (res) {\n                    return res.json();\n                }).then(function (json) {\n                    console.log(json);\n                });\n            }\n        }\n    }, {\n        key: 'mySubscriber',\n        value: function mySubscriber(msg, data) {\n\n            if (data.status) {\n                window.localStorage.setItem('accessToken', data.token);\n                window.localStorage.setItem('userid', data.userid);\n                window.localStorage.setItem('isLoggedIn', true);\n                this.auth.activeInterval(this.props.history);\n                //   this.saveCurrentLocation();\n            } else {\n                window.localStorage.removeItem('accessToken');\n                window.localStorage.removeItem('userid');\n                window.localStorage.removeItem('isLoggedIn');\n                this.auth.stopInterval();\n            }\n            this.isLoggedIn(data);\n        }\n    }, {\n        key: 'isLoggedIn',\n        value: function isLoggedIn(data) {\n            var boolFlag = window.localStorage.getItem('isLoggedIn');\n            if (data.hasOwnProperty('callback')) {\n                data.callback();\n            }\n\n            if (!data.status) {\n                _pubsubJs2.default.publish('IS_LOGOUT');\n            }\n\n            this.setState({\n                isLoggedIn: boolFlag !== null && boolFlag !== '' ? JSON.parse(boolFlag) : false\n            });\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return _react2.default.createElement(\n                'div',\n                null,\n                _react2.default.createElement(_router2.default, { islogin: this.state.isLoggedIn })\n            );\n        }\n    }]);\n\n    return App;\n}(_react.Component);\n\nexports.default = (0, _reactRouterDom.withRouter)(App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL0FwcC5qcz9hMGY1Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwic3RhdGUiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibXlTdWJzY3JpYmVyIiwiYmluZCIsIlB1YlN1YiIsInN1YnNjcmliZSIsImF1dGgiLCJBdXRoIiwiaXNMb2dnZWRJbiIsImFjdGl2ZUludGVydmFsIiwiaGlzdG9yeSIsInN0b3BJbnRlcnZhbCIsImNhbGxiYWNrIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsInNldEl0ZW0iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInRpbWVvdXQiLCJ3YXRjaFBvc2l0aW9uIiwiZ2V0Q3VycmVudExvYyIsIm9sZGxvYyIsIm5ld2xvYyIsImxhdDEiLCJzcGxpdCIsImxvbjEiLCJsYXQyIiwibG9uMiIsInJhZGxhdDEiLCJNYXRoIiwiUEkiLCJyYWRsYXQyIiwidGhldGEiLCJyYWR0aGV0YSIsImRpc3QiLCJzaW4iLCJjb3MiLCJhY29zIiwidW5pdCIsImRpc3RhbmNlIiwiY2hlY2tEaXN0YW5jZUJldHdlZW5sb2NhdGlvbiIsImxhdCIsImxuZyIsImdlb2NvZGVyIiwiZ29vZ2xlIiwibWFwcyIsIkdlb2NvZGVyIiwibGF0bG5nIiwicGFyc2VGbG9hdCIsImdlb2NvZGUiLCJyZXN1bHRzIiwic3RhdHVzIiwiZ2V0WmlwY29kZSIsImFsZXJ0IiwicGxhY2UiLCJ6aXBjb2RlcyIsIkFycmF5IiwiaXNBcnJheSIsImsiLCJsZW5ndGgiLCJpIiwiYWRkcmVzc19jb21wb25lbnRzIiwiaiIsInR5cGVzIiwicHVzaCIsImxvbmdfbmFtZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicGxhdGxuZyIsInB6aXBjb2RlcyIsInVzZXJJZCIsInRva2VuIiwidGhlbiIsInJlcyIsImpzb24iLCJtc2ciLCJkYXRhIiwidXNlcmlkIiwicmVtb3ZlSXRlbSIsImJvb2xGbGFnIiwiaGFzT3duUHJvcGVydHkiLCJwdWJsaXNoIiwic2V0U3RhdGUiLCJwYXJzZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNNQSxHOzs7QUFDRixpQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLDhHQUNUQSxLQURTOztBQUVmLGNBQUtDLEtBQUwsR0FBYTtBQUNULDBCQUFjQyxPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixZQUE1QixDQURMO0FBRVQsb0JBQVEsR0FGQyxFQUVJO0FBQ2Isc0JBQVU7QUFIRCxTQUFiO0FBS0EsY0FBS0MsWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCQyxJQUFsQixPQUFwQjtBQUNBQywyQkFBT0MsU0FBUCxDQUFpQixVQUFqQixFQUE2QixNQUFLSCxZQUFsQztBQUNBLGNBQUtJLElBQUwsR0FBWSxJQUFJQyxVQUFKLEVBQVo7QUFDQSxZQUFJLE1BQUtULEtBQUwsQ0FBV1UsVUFBZixFQUEyQjtBQUN2QixrQkFBS0YsSUFBTCxDQUFVRyxjQUFWLENBQXlCLE1BQUtaLEtBQUwsQ0FBV2EsT0FBcEM7QUFDSCxTQUZELE1BRU87QUFDSCxrQkFBS0osSUFBTCxDQUFVSyxZQUFWO0FBQ0g7O0FBZGM7QUFnQmxCOzs7O3dDQUVlQyxRLEVBQVU7QUFDdEIsZ0JBQUlDLGFBQWFBLFVBQVVDLFdBQTNCLEVBQXdDO0FBQ3BDRCwwQkFBVUMsV0FBVixDQUFzQkMsa0JBQXRCLENBQXlDLFVBQUNDLFFBQUQsRUFBYztBQUNuRCx3QkFBSWpCLE9BQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFVBQTVCLE1BQTRDLElBQWhELEVBQXNEO0FBQ2xERiwrQkFBT0MsWUFBUCxDQUFvQmlCLE9BQXBCLENBQTRCLFVBQTVC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LGdCQUFELElBQVMsU0FBUyxLQUFLM0YsS0FBTCxDQUFXVSxVQUE3QjtBQURKLGFBRFI7QUFJSDs7OztFQXhQYXNGLGdCOztrQkEyUEgsZ0NBQVdsRyxHQUFYLEMiLCJmaWxlIjoiNTguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXMsIENvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB3aXRoUm91dGVyIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuaW1wb3J0IHtBdXRofSBmcm9tICcuL2NvbW1vbi9hdXRoJztcclxuaW1wb3J0IFB1YlN1YiBmcm9tICdwdWJzdWItanMnO1xyXG5pbXBvcnQgJy4vc3R5bGUvY3NzL0FwcC5zY3NzJztcclxuaW1wb3J0IFJvdXRpbmcgZnJvbSAnLi9yb3V0ZXIvcm91dGVyJztcclxuY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIFwiaXNMb2dnZWRJblwiOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lzTG9nZ2VkSW4nKSxcclxuICAgICAgICAgICAgXCJ1bml0XCI6IFwiS1wiLCAvLyAnTScgaXMgc3RhdHV0ZSBtaWxlcyAoZGVmYXVsdCkgLCAnSycgaXMga2lsb21ldGVycyAgLCAnTicgaXMgbmF1dGljYWwgbWlsZXNcclxuICAgICAgICAgICAgXCJkaWZmZXJcIjogMjBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubXlTdWJzY3JpYmVyID0gdGhpcy5teVN1YnNjcmliZXIuYmluZCh0aGlzKTtcclxuICAgICAgICBQdWJTdWIuc3Vic2NyaWJlKCdJU19MT0dJTicsIHRoaXMubXlTdWJzY3JpYmVyKTtcclxuICAgICAgICB0aGlzLmF1dGggPSBuZXcgQXV0aCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzTG9nZ2VkSW4pIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLmFjdGl2ZUludGVydmFsKHRoaXMucHJvcHMuaGlzdG9yeSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEdlb2xvY2F0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocG9zaXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BsYXQtbG9nJywgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyPlwiLCBlcnJvcik7XHJcblxyXG4gICAgICAgICAgICB9LCB7dGltZW91dDogMTAwMDB9KTtcclxuXHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSlcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykgIT09IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj4+PkNoYW5nZSBpbiBhZGRyZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGxhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycj5cIiwgZXJyb3IpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcblxyXG4gICAgICAgIC8qIHRoaXMuaW5pdEdlb2xvY2F0aW9uKCAoKT0+IHtcclxuICAgICAgICAgdGhpcy5nZXRjb2RlKCk7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgICAqL1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5nZXRDdXJyZW50TG9jKCgpID0+IHtcclxuICAgICAgICAgICAgLy90aGlzLmdldFBvc3RhbENvZGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tEaXN0YW5jZUJldHdlZW5sb2NhdGlvbihvbGRsb2MsIG5ld2xvYykge1xyXG5cclxuICAgICAgICBsZXQgbGF0MSA9IG9sZGxvYy5zcGxpdChcIi0tXCIpWzBdO1xyXG4gICAgICAgIGxldCBsb24xID0gb2xkbG9jLnNwbGl0KFwiLS1cIilbMV07XHJcblxyXG4gICAgICAgIGxldCBsYXQyID0gbmV3bG9jLmxhdGl0dWRlO1xyXG4gICAgICAgIGxldCBsb24yID0gbmV3bG9jLmxvbmdpdHVkZTtcclxuXHJcblxyXG4gICAgICAgIHZhciByYWRsYXQxID0gTWF0aC5QSSAqIGxhdDEgLyAxODBcclxuICAgICAgICB2YXIgcmFkbGF0MiA9IE1hdGguUEkgKiBsYXQyIC8gMTgwXHJcbiAgICAgICAgLy8gIHZhciByYWRsb24xID0gTWF0aC5QSSAqIGxvbjEgLyAxODBcclxuICAgICAgICAvLyB2YXIgcmFkbG9uMiA9IE1hdGguUEkgKiBsb24yIC8gMTgwXHJcbiAgICAgICAgdmFyIHRoZXRhID0gbG9uMSAtIGxvbjJcclxuICAgICAgICB2YXIgcmFkdGhldGEgPSBNYXRoLlBJICogdGhldGEgLyAxODBcclxuICAgICAgICB2YXIgZGlzdCA9IE1hdGguc2luKHJhZGxhdDEpICogTWF0aC5zaW4ocmFkbGF0MikgKyBNYXRoLmNvcyhyYWRsYXQxKSAqIE1hdGguY29zKHJhZGxhdDIpICogTWF0aC5jb3MocmFkdGhldGEpO1xyXG4gICAgICAgIGRpc3QgPSBNYXRoLmFjb3MoZGlzdClcclxuICAgICAgICBkaXN0ID0gZGlzdCAqIDE4MCAvIE1hdGguUElcclxuICAgICAgICBkaXN0ID0gZGlzdCAqIDYwICogMS4xNTE1XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudW5pdCA9PT0gXCJLXCIpIHtcclxuICAgICAgICAgICAgZGlzdCA9IGRpc3QgKiAxLjYwOTM0NFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS51bml0ID09PSBcIk5cIikge1xyXG4gICAgICAgICAgICBkaXN0ID0gZGlzdCAqIDAuODY4NFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhkaXN0KVxyXG5cclxuICAgICAgICByZXR1cm4gZGlzdFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJyZW50TG9jKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIGRpc3RhbmNlO1xyXG4gICAgICAgIGlmIChuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjbGF0LWxvZycpID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGF0LWxvZycsIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPj4+Pj4+Pj4+Pj5cIilcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IHRoaXMuY2hlY2tEaXN0YW5jZUJldHdlZW5sb2NhdGlvbih3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsYXQtbG9nJyksIHBvc2l0aW9uLmNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGlzdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycj5cIiwgZXJyb3IpO1xyXG5cclxuICAgICAgICAgICAgfSwge3RpbWVvdXQ6IDEwMDAwfSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbigocG9zaXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2xhdC1sb2cnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2UgPSB0aGlzLmNoZWNrRGlzdGFuY2VCZXR3ZWVubG9jYXRpb24od2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjbGF0LWxvZycpLCBwb3NpdGlvbi5jb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRpc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2xhdC1sb2cnKSAhPT0gcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NsYXQtbG9nJywgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIH0gKi9cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycj5cIiwgZXJyb3IpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Y29kZSgpIHtcclxuICAgICAgICB2YXIgbGF0LCBsbmcgPSAnJztcclxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjbGF0LWxvZycpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxhdCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2xhdC1sb2cnKS5zcGxpdCgnLS0nKVswXTtcclxuICAgICAgICAgICAgbG5nID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjbGF0LWxvZycpLnNwbGl0KCctLScpWzFdO1xyXG4gICAgICAgICAgICB2YXIgZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXI7XHJcbiAgICAgICAgICAgIHZhciBsYXRsbmcgPSB7bGF0OiBwYXJzZUZsb2F0KGxhdCksIGxuZzogcGFyc2VGbG9hdChsbmcpfTtcclxuICAgICAgICAgICAgZ2VvY29kZXIuZ2VvY29kZSh7J2xvY2F0aW9uJzogbGF0bG5nfSwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ09LJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0WmlwY29kZShyZXN1bHRzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KCdHZW9jb2RlciBmYWlsZWQgZHVlIHRvOiAnICsgc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFppcGNvZGUocGxhY2UpIHtcclxuXHJcbiAgICAgICAgdmFyIHppcGNvZGVzID0gW107XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGxhY2UpKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgcGxhY2UubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlc1tqXSA9PSBcInBvc3RhbF9jb2RlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50c1tpXS5sb25nX25hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgemlwY29kZXMucHVzaChwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHNbaV0ubG9uZ19uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlc1tqXSA9PSBcInBvc3RhbF9jb2RlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLmxvbmdfbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHppcGNvZGVzLnB1c2gocGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLmxvbmdfbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh6aXBjb2Rlcyk7XHJcbiAgICAgICAgaWYgKHppcGNvZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjemlwY29kZXMnLCB6aXBjb2Rlcyk7XHJcbiAgICAgICAgICAgIC8vU3RvcmUgaW4gSW5kZXhEQlxyXG4gICAgICAgICAgICAvLyBzdG9yZS5zdG9yZWluSWRiKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVDdXJyZW50TG9jYXRpb24oKSB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGV2aWNlVG9rZW4nKSAhPT0gbnVsbCAmJiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgZmV0Y2goJy9hcGkvd2hlcmVpYW0nLCB7bWV0aG9kOiAncG9zdCcsIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF0bG5nOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJyksXHJcbiAgICAgICAgICAgICAgICAgICAgcHppcGNvZGVzOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3B6aXBjb2RlcycpLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJZDogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyaWQnKSxcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkZXZpY2VUb2tlbicpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKS50aGVuKGpzb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coanNvbik7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG15U3Vic2NyaWJlcihtc2csIGRhdGEpIHtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYWNjZXNzVG9rZW4nLCBkYXRhLnRva2VuKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyaWQnLCBkYXRhLnVzZXJpZCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNMb2dnZWRJbicsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmF1dGguYWN0aXZlSW50ZXJ2YWwodGhpcy5wcm9wcy5oaXN0b3J5KTtcclxuICAgICAgICAgICAgLy8gICB0aGlzLnNhdmVDdXJyZW50TG9jYXRpb24oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FjY2Vzc1Rva2VuJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcmlkJyk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnaXNMb2dnZWRJbicpO1xyXG4gICAgICAgICAgICB0aGlzLmF1dGguc3RvcEludGVydmFsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNMb2dnZWRJbihkYXRhKTtcclxuICAgIH1cclxuICAgIGlzTG9nZ2VkSW4oZGF0YSkge1xyXG4gICAgICAgIHZhciBib29sRmxhZyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaXNMb2dnZWRJbicpO1xyXG4gICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KCdjYWxsYmFjaycpKSB7XHJcbiAgICAgICAgICAgIGRhdGEuY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghZGF0YS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgUHViU3ViLnB1Ymxpc2goJ0lTX0xPR09VVCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGlzTG9nZ2VkSW46IChib29sRmxhZyAhPT0gbnVsbCAmJiBib29sRmxhZyAhPT0gJycpID8gSlNPTi5wYXJzZShib29sRmxhZykgOiBmYWxzZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxSb3V0aW5nIGlzbG9naW49e3RoaXMuc3RhdGUuaXNMb2dnZWRJbn0gLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2Pik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdpdGhSb3V0ZXIoQXBwKTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY2xpZW50L3NyYy9BcHAuanMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///58\n")}});