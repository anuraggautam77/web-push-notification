webpackHotUpdate(0,{58:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(3);\n\nvar _auth = __webpack_require__(59);\n\nvar _pubsubJs = __webpack_require__(12);\n\nvar _pubsubJs2 = _interopRequireDefault(_pubsubJs);\n\n__webpack_require__(61);\n\nvar _router = __webpack_require__(62);\n\nvar _router2 = _interopRequireDefault(_router);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar App = function (_Component) {\n    _inherits(App, _Component);\n\n    function App(props) {\n        _classCallCheck(this, App);\n\n        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));\n\n        _this.state = {\n            \"isLoggedIn\": window.localStorage.getItem('isLoggedIn'),\n            \"unit\": \"K\", // 'M' is statute miles (default) , 'K' is kilometers  , 'N' is nautical miles\n            \"differ\": 20\n        };\n        _this.mySubscriber = _this.mySubscriber.bind(_this);\n        _pubsubJs2.default.subscribe('IS_LOGIN', _this.mySubscriber);\n        _this.auth = new _auth.Auth();\n        if (_this.state.isLoggedIn) {\n            _this.auth.activeInterval(_this.props.history);\n        } else {\n            _this.auth.stopInterval();\n        }\n\n        return _this;\n    }\n\n    _createClass(App, [{\n        key: 'initGeolocation',\n        value: function initGeolocation(callback) {\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position) {\n                    if (window.localStorage.getItem('plat-log') === null) {\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                    }\n                    callback();\n                }, function (error) {\n                    console.log(\"err>\", error);\n                }, { timeout: 10000 });\n\n                navigator.geolocation.watchPosition(function (position) {\n                    console.log(position.coords.latitude + \"--\" + position.coords.longitude);\n                    if (window.localStorage.getItem('plat-log') !== position.coords.latitude + \"--\" + position.coords.longitude) {\n                        console.log(\">>>Change in address\");\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                });\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n\n            /* this.initGeolocation( ()=> {\r\n             this.getcode();\r\n             });\r\n             */\n\n            this.getCurrentLoc(function () {\n                //this.getPostalCode();\n            });\n        }\n    }, {\n        key: 'checkDistanceBetweenlocation',\n        value: function checkDistanceBetweenlocation(oldloc, newloc) {\n\n            var lat1 = oldloc.split(\"--\")[0];\n            var lon1 = oldloc.split(\"--\")[1];\n\n            var lat2 = newloc.latitude;\n            var lon2 = newloc.longitude;\n\n            var radlat1 = Math.PI * lat1 / 180;\n            var radlat2 = Math.PI * lat2 / 180;\n            //  var radlon1 = Math.PI * lon1 / 180\n            // var radlon2 = Math.PI * lon2 / 180\n            var theta = lon1 - lon2;\n            var radtheta = Math.PI * theta / 180;\n            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);\n            dist = Math.acos(dist);\n            dist = dist * 180 / Math.PI;\n            dist = dist * 60 * 1.1515;\n            if (unit == \"K\") {\n                dist = dist * 1.609344;\n            }\n            if (unit == \"N\") {\n                dist = dist * 0.8684;\n            }\n            return dist;\n        }\n    }, {\n        key: 'getCurrentLoc',\n        value: function getCurrentLoc(callback) {\n            var _this2 = this;\n\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position) {\n                    if (window.localStorage.getItem('clat-log') === null) {\n                        window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    } else {\n                        console.log(\">>>>>>>>>>>\");\n                        _this2.checkDistanceBetweenlocation(window.localStorage.setItem('clat-log'), position.coords);\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                }, { timeout: 10000 });\n\n                navigator.geolocation.watchPosition(function (position) {\n                    console.log(position.coords.latitude + \"--\" + position.coords.longitude);\n\n                    if (window.localStorage.getItem('clat-log') === null) {\n                        window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    } else {\n\n                        _this2.checkDistanceBetweenlocation();\n\n                        /*\r\n                         if (window.localStorage.getItem('clat-log') !== position.coords.latitude + \"--\" + position.coords.longitude) {\r\n                         window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\r\n                         } */\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                });\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'getcode',\n        value: function getcode() {\n            var _this3 = this;\n\n            var lat,\n                lng = '';\n            if (window.localStorage.getItem('clat-log') !== null) {\n                lat = window.localStorage.getItem('clat-log').split('--')[0];\n                lng = window.localStorage.getItem('clat-log').split('--')[1];\n                var geocoder = new google.maps.Geocoder();\n                var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };\n                geocoder.geocode({ 'location': latlng }, function (results, status) {\n                    if (status === 'OK') {\n                        _this3.getZipcode(results);\n                    } else {\n                        window.alert('Geocoder failed due to: ' + status);\n                    }\n                });\n            }\n        }\n    }, {\n        key: 'getZipcode',\n        value: function getZipcode(place) {\n\n            var zipcodes = [];\n            if (Array.isArray(place)) {\n                for (var k = 0; k < place.length; k++) {\n                    for (var i = 0; i < place[k].address_components.length; i++) {\n                        for (var j = 0; j < place[k].address_components[i].types.length; j++) {\n                            if (place[k].address_components[i].types[j] == \"postal_code\") {\n                                // console.log(place[k].address_components[i].long_name);\n                                zipcodes.push(place[k].address_components[i].long_name);\n                            }\n                        }\n                    }\n                }\n            } else {\n                for (var i = 0; i < place.address_components.length; i++) {\n                    for (var j = 0; j < place.address_components[i].types.length; j++) {\n                        if (place.address_components[i].types[j] == \"postal_code\") {\n                            // console.log(place.address_components[i].long_name);\n                            zipcodes.push(place.address_components[i].long_name);\n                        }\n                    }\n                }\n            }\n            console.log(zipcodes);\n            if (zipcodes.length > 0) {\n                window.localStorage.setItem('czipcodes', zipcodes);\n                //Store in IndexDB\n                // store.storeinIdb();\n            }\n        }\n    }, {\n        key: 'saveCurrentLocation',\n        value: function saveCurrentLocation() {\n            if (window.localStorage.getItem('deviceToken') !== null && window.localStorage.getItem('plat-log') !== null) {\n                fetch('/api/whereiam', { method: 'post', headers: { 'Content-Type': 'application/json' },\n                    body: JSON.stringify({\n                        platlng: window.localStorage.getItem('plat-log'),\n                        pzipcodes: window.localStorage.getItem('pzipcodes'),\n                        userId: window.localStorage.getItem('userid'),\n                        token: window.localStorage.getItem('deviceToken')\n                    })\n                }).then(function (res) {\n                    return res.json();\n                }).then(function (json) {\n                    console.log(json);\n                });\n            }\n        }\n    }, {\n        key: 'mySubscriber',\n        value: function mySubscriber(msg, data) {\n\n            if (data.status) {\n                window.localStorage.setItem('accessToken', data.token);\n                window.localStorage.setItem('userid', data.userid);\n                window.localStorage.setItem('isLoggedIn', true);\n                this.auth.activeInterval(this.props.history);\n                //   this.saveCurrentLocation();\n            } else {\n                window.localStorage.removeItem('accessToken');\n                window.localStorage.removeItem('userid');\n                window.localStorage.removeItem('isLoggedIn');\n                this.auth.stopInterval();\n            }\n            this.isLoggedIn(data);\n        }\n    }, {\n        key: 'isLoggedIn',\n        value: function isLoggedIn(data) {\n            var boolFlag = window.localStorage.getItem('isLoggedIn');\n            if (data.hasOwnProperty('callback')) {\n                data.callback();\n            }\n\n            if (!data.status) {\n                _pubsubJs2.default.publish('IS_LOGOUT');\n            }\n\n            this.setState({\n                isLoggedIn: boolFlag !== null && boolFlag !== '' ? JSON.parse(boolFlag) : false\n            });\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return _react2.default.createElement(\n                'div',\n                null,\n                _react2.default.createElement(_router2.default, { islogin: this.state.isLoggedIn })\n            );\n        }\n    }]);\n\n    return App;\n}(_react.Component);\n\nexports.default = (0, _reactRouterDom.withRouter)(App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL0FwcC5qcz9hMGY1Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwic3RhdGUiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibXlTdWJzY3JpYmVyIiwiYmluZCIsIlB1YlN1YiIsInN1YnNjcmliZSIsImF1dGgiLCJBdXRoIiwiaXNMb2dnZWRJbiIsImFjdGl2ZUludGVydmFsIiwiaGlzdG9yeSIsInN0b3BJbnRlcnZhbCIsImNhbGxiYWNrIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsInNldEl0ZW0iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInRpbWVvdXQiLCJ3YXRjaFBvc2l0aW9uIiwiZ2V0Q3VycmVudExvYyIsIm9sZGxvYyIsIm5ld2xvYyIsImxhdDEiLCJzcGxpdCIsImxvbjEiLCJsYXQyIiwibG9uMiIsInJhZGxhdDEiLCJNYXRoIiwiUEkiLCJyYWRsYXQyIiwidGhldGEiLCJyYWR0aGV0YSIsImRpc3QiLCJzaW4iLCJjb3MiLCJhY29zIiwidW5pdCIsImNoZWNrRGlzdGFuY2VCZXR3ZWVubG9jYXRpb24iLCJsYXQiLCJsbmciLCJnZW9jb2RlciIsImdvb2dsZSIsIm1hcHMiLCJHZW9jb2RlciIsImxhdGxuZyIsInBhcnNlRmxvYXQiLCJnZW9jb2RlIiwicmVzdWx0cyIsInN0YXR1cyIsImdldFppcGNvZGUiLCJhbGVydCIsInBsYWNlIiwiemlwY29kZXMiLCJBcnJheSIsImlzQXJyYXkiLCJrIiwibGVuZ3RoIiwiaSIsImFkZHJlc3NfY29tcG9uZW50cyIsImoiLCJ0eXBlcyIsInB1c2giLCJsb25nX25hbWUiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInBsYXRsbmciLCJwemlwY29kZXMiLCJ1c2VySWQiLCJ0b2tlbiIsInRoZW4iLCJyZXMiLCJqc29uIiwibXNnIiwiZGF0YSIsInVzZXJpZCIsInJlbW92ZUl0ZW0iLCJib29sRmxhZyIsImhhc093blByb3BlcnR5IiwicHVibGlzaCIsInNldFN0YXRlIiwicGFyc2UiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDTUEsRzs7O0FBQ0YsaUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw4R0FDVEEsS0FEUzs7QUFFZixjQUFLQyxLQUFMLEdBQWE7QUFDVCwwQkFBY0MsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsWUFBNUIsQ0FETDtBQUVULG9CQUFPLEdBRkUsRUFFRztBQUNaLHNCQUFTO0FBSEEsU0FBYjtBQUtBLGNBQUtDLFlBQUwsR0FBb0IsTUFBS0EsWUFBTCxDQUFrQkMsSUFBbEIsT0FBcEI7QUFDQUMsMkJBQU9DLFNBQVAsQ0FBaUIsVUFBakIsRUFBNkIsTUFBS0gsWUFBbEM7QUFDQSxjQUFLSSxJQUFMLEdBQVksSUFBSUMsVUFBSixFQUFaO0FBQ0EsWUFBSSxNQUFLVCxLQUFMLENBQVdVLFVBQWYsRUFBMkI7QUFDdkIsa0JBQUtGLElBQUwsQ0FBVUcsY0FBVixDQUF5QixNQUFLWixLQUFMLENBQVdhLE9BQXBDO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsa0JBQUtKLElBQUwsQ0FBVUssWUFBVjtBQUNIOztBQWRjO0FBZ0JsQjs7Ozt3Q0FFZUMsUSxFQUFVO0FBQ3RCLGdCQUFJQyxhQUFhQSxVQUFVQyxXQUEzQixFQUF3QztBQUNwQ0QsMEJBQVVDLFdBQVYsQ0FBc0JDLGtCQUF0QixDQUF5QyxVQUFDQyxRQUFELEVBQWM7QUFDbkQsd0JBQUlqQixPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixVQUE1QixNQUE0QyxJQUFoRCxFQUFzRDtBQUNsREYsK0JBQU9DLFlBQVAsQ0FBb0JpQixPQUFwQixDQUE0QixVQUE1QixFQUF3Q0QsU0FB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QUF5QixLQUFLWixLQUFMLENBQVdhLE9BQXBDO0FBQ0E7QUFDSCxhQU5ELE1BTU87QUFDSFgsdUJBQU9DLFlBQVAsQ0FBb0J1RixVQUFwQixDQUErQixhQUEvQjtBQUNBeEYsdUJBQU9DLFlBQVAsQ0FBb0J1RixVQUFwQixDQUErQixRQUEvQjtBQUNBeEYsdUJBQU9DLFlBQVAsQ0FBb0J1RixVQUFwQixDQUErQixZQUEvQjtBQUNBLHFCQUFLakYsSUFBTCxDQUFVSyxZQUFWO0FBQ0g7QUFDRCxpQkFBS0gsVUFBTCxDQUFnQjZFLElBQWhCO0FBQ0g7OzttQ0FDVUEsSSxFQUFNO0FBQ2IsZ0JBQUlHLFdBQVd6RixPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixZQUE1QixDQUFmO0FBQ0EsZ0JBQUlvRixLQUFLSSxjQUFMLENBQW9CLFVBQXBCLENBQUosRUFBcUM7QUFDakNKLHFCQUFLekUsUUFBTDtBQUNIOztBQUVELGdCQUFJLENBQUN5RSxLQUFLN0IsTUFBVixFQUFrQjtBQUNkcEQsbUNBQU9zRixPQUFQLENBQWUsV0FBZjtBQUNIOztBQUVELGlCQUFLQyxRQUFMLENBQWM7QUFDVm5GLDRCQUFhZ0YsYUFBYSxJQUFiLElBQXFCQSxhQUFhLEVBQW5DLEdBQXlDYixLQUFLaUIsS0FBTCxDQUFXSixRQUFYLENBQXpDLEdBQWdFO0FBRGxFLGFBQWQ7QUFHSDs7O2lDQUNRO0FBQ0wsbUJBQ1E7QUFBQTtBQUFBO0FBQ0ksOENBQUMsZ0JBQUQsSUFBUyxTQUFTLEtBQUsxRixLQUFMLENBQVdVLFVBQTdCO0FBREosYUFEUjtBQUlIOzs7O0VBcFBhcUYsZ0I7O2tCQXVQSCxnQ0FBV2pHLEdBQVgsQyIsImZpbGUiOiI1OC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlcywgQ29tcG9uZW50fSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5pbXBvcnQge0F1dGh9IGZyb20gJy4vY29tbW9uL2F1dGgnO1xyXG5pbXBvcnQgUHViU3ViIGZyb20gJ3B1YnN1Yi1qcyc7XHJcbmltcG9ydCAnLi9zdHlsZS9jc3MvQXBwLnNjc3MnO1xyXG5pbXBvcnQgUm91dGluZyBmcm9tICcuL3JvdXRlci9yb3V0ZXInO1xyXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgXCJpc0xvZ2dlZEluXCI6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaXNMb2dnZWRJbicpLFxyXG4gICAgICAgICAgICBcInVuaXRcIjpcIktcIiwgLy8gJ00nIGlzIHN0YXR1dGUgbWlsZXMgKGRlZmF1bHQpICwgJ0snIGlzIGtpbG9tZXRlcnMgICwgJ04nIGlzIG5hdXRpY2FsIG1pbGVzXHJcbiAgICAgICAgICAgIFwiZGlmZmVyXCI6MjBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubXlTdWJzY3JpYmVyID0gdGhpcy5teVN1YnNjcmliZXIuYmluZCh0aGlzKTtcclxuICAgICAgICBQdWJTdWIuc3Vic2NyaWJlKCdJU19MT0dJTicsIHRoaXMubXlTdWJzY3JpYmVyKTtcclxuICAgICAgICB0aGlzLmF1dGggPSBuZXcgQXV0aCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzTG9nZ2VkSW4pIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLmFjdGl2ZUludGVydmFsKHRoaXMucHJvcHMuaGlzdG9yeSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEdlb2xvY2F0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocG9zaXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BsYXQtbG9nJywgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyPlwiLCBlcnJvcik7XHJcblxyXG4gICAgICAgICAgICB9LCB7dGltZW91dDogMTAwMDB9KTtcclxuXHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSlcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykgIT09IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj4+PkNoYW5nZSBpbiBhZGRyZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGxhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycj5cIiwgZXJyb3IpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcblxyXG4gICAgICAgIC8qIHRoaXMuaW5pdEdlb2xvY2F0aW9uKCAoKT0+IHtcclxuICAgICAgICAgdGhpcy5nZXRjb2RlKCk7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgICAqL1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5nZXRDdXJyZW50TG9jKCgpID0+IHtcclxuICAgICAgICAgICAgLy90aGlzLmdldFBvc3RhbENvZGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tEaXN0YW5jZUJldHdlZW5sb2NhdGlvbihvbGRsb2MsIG5ld2xvYykge1xyXG5cclxuICAgICAgICBsZXQgbGF0MSA9IG9sZGxvYy5zcGxpdChcIi0tXCIpWzBdO1xyXG4gICAgICAgIGxldCBsb24xID0gb2xkbG9jLnNwbGl0KFwiLS1cIilbMV07XHJcblxyXG4gICAgICAgIGxldCBsYXQyID0gbmV3bG9jLmxhdGl0dWRlO1xyXG4gICAgICAgIGxldCBsb24yID0gbmV3bG9jLmxvbmdpdHVkZTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgdmFyIHJhZGxhdDEgPSBNYXRoLlBJICogbGF0MSAvIDE4MFxyXG4gICAgICAgIHZhciByYWRsYXQyID0gTWF0aC5QSSAqIGxhdDIgLyAxODBcclxuICAgICAgLy8gIHZhciByYWRsb24xID0gTWF0aC5QSSAqIGxvbjEgLyAxODBcclxuICAgICAgICAvLyB2YXIgcmFkbG9uMiA9IE1hdGguUEkgKiBsb24yIC8gMTgwXHJcbiAgICAgICAgdmFyIHRoZXRhID0gbG9uMSAtIGxvbjJcclxuICAgICAgICB2YXIgcmFkdGhldGEgPSBNYXRoLlBJICogdGhldGEgLyAxODBcclxuICAgICAgICB2YXIgZGlzdCA9IE1hdGguc2luKHJhZGxhdDEpICogTWF0aC5zaW4ocmFkbGF0MikgKyBNYXRoLmNvcyhyYWRsYXQxKSAqIE1hdGguY29zKHJhZGxhdDIpICogTWF0aC5jb3MocmFkdGhldGEpO1xyXG4gICAgICAgIGRpc3QgPSBNYXRoLmFjb3MoZGlzdClcclxuICAgICAgICBkaXN0ID0gZGlzdCAqIDE4MCAvIE1hdGguUElcclxuICAgICAgICBkaXN0ID0gZGlzdCAqIDYwICogMS4xNTE1XHJcbiAgICAgICAgaWYgKHVuaXQgPT0gXCJLXCIpIHtcclxuICAgICAgICAgICAgZGlzdCA9IGRpc3QgKiAxLjYwOTM0NFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodW5pdCA9PSBcIk5cIikge1xyXG4gICAgICAgICAgICBkaXN0ID0gZGlzdCAqIDAuODY4NFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGlzdFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJyZW50TG9jKGNhbGxiYWNrKSB7XHJcblxyXG4gICAgICAgIGlmIChuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjbGF0LWxvZycpID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGF0LWxvZycsIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPj4+Pj4+Pj4+Pj5cIilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrRGlzdGFuY2VCZXR3ZWVubG9jYXRpb24od2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGF0LWxvZycpLCBwb3NpdGlvbi5jb29yZHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycj5cIiwgZXJyb3IpO1xyXG5cclxuICAgICAgICAgICAgfSwge3RpbWVvdXQ6IDEwMDAwfSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24ud2F0Y2hQb3NpdGlvbigocG9zaXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2xhdC1sb2cnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0Rpc3RhbmNlQmV0d2VlbmxvY2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsYXQtbG9nJykgIT09IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGF0LWxvZycsIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICB9ICovXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnI+XCIsIGVycm9yKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdHZW9sb2NhdGlvbiBpcyBub3Qgc3VwcG9ydGVkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldGNvZGUoKSB7XHJcbiAgICAgICAgdmFyIGxhdCwgbG5nID0gJyc7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2xhdC1sb2cnKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsYXQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsYXQtbG9nJykuc3BsaXQoJy0tJylbMF07XHJcbiAgICAgICAgICAgIGxuZyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2xhdC1sb2cnKS5zcGxpdCgnLS0nKVsxXTtcclxuICAgICAgICAgICAgdmFyIGdlb2NvZGVyID0gbmV3IGdvb2dsZS5tYXBzLkdlb2NvZGVyO1xyXG4gICAgICAgICAgICB2YXIgbGF0bG5nID0ge2xhdDogcGFyc2VGbG9hdChsYXQpLCBsbmc6IHBhcnNlRmxvYXQobG5nKX07XHJcbiAgICAgICAgICAgIGdlb2NvZGVyLmdlb2NvZGUoeydsb2NhdGlvbic6IGxhdGxuZ30sIChyZXN1bHRzLCBzdGF0dXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT09ICdPSycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFppcGNvZGUocmVzdWx0cyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydCgnR2VvY29kZXIgZmFpbGVkIGR1ZSB0bzogJyArIHN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRaaXBjb2RlKHBsYWNlKSB7XHJcblxyXG4gICAgICAgIHZhciB6aXBjb2RlcyA9IFtdO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBsYWNlKSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHBsYWNlLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXNbal0gPT0gXCJwb3N0YWxfY29kZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHNbaV0ubG9uZ19uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHppcGNvZGVzLnB1c2gocGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzW2ldLmxvbmdfbmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2UuYWRkcmVzc19jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXNbal0gPT0gXCJwb3N0YWxfY29kZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXS5sb25nX25hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB6aXBjb2Rlcy5wdXNoKHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXS5sb25nX25hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coemlwY29kZXMpO1xyXG4gICAgICAgIGlmICh6aXBjb2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3ppcGNvZGVzJywgemlwY29kZXMpO1xyXG4gICAgICAgICAgICAvL1N0b3JlIGluIEluZGV4REJcclxuICAgICAgICAgICAgLy8gc3RvcmUuc3RvcmVpbklkYigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzYXZlQ3VycmVudExvY2F0aW9uKCkge1xyXG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RldmljZVRva2VuJykgIT09IG51bGwgJiYgd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF0LWxvZycpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZldGNoKCcvYXBpL3doZXJlaWFtJywge21ldGhvZDogJ3Bvc3QnLCBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhdGxuZzogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF0LWxvZycpLFxyXG4gICAgICAgICAgICAgICAgICAgIHB6aXBjb2Rlczogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwemlwY29kZXMnKSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VySWQ6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlcmlkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGV2aWNlVG9rZW4nKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmpzb24oKSkudGhlbihqc29uID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGpzb24pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBteVN1YnNjcmliZXIobXNnLCBkYXRhKSB7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLnN0YXR1cykge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FjY2Vzc1Rva2VuJywgZGF0YS50b2tlbik7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcmlkJywgZGF0YS51c2VyaWQpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lzTG9nZ2VkSW4nLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLmFjdGl2ZUludGVydmFsKHRoaXMucHJvcHMuaGlzdG9yeSk7XHJcbiAgICAgICAgICAgIC8vICAgdGhpcy5zYXZlQ3VycmVudExvY2F0aW9uKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhY2Nlc3NUb2tlbicpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJpZCcpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2lzTG9nZ2VkSW4nKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzTG9nZ2VkSW4oZGF0YSk7XHJcbiAgICB9XHJcbiAgICBpc0xvZ2dlZEluKGRhdGEpIHtcclxuICAgICAgICB2YXIgYm9vbEZsYWcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lzTG9nZ2VkSW4nKTtcclxuICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnY2FsbGJhY2snKSkge1xyXG4gICAgICAgICAgICBkYXRhLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWRhdGEuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIFB1YlN1Yi5wdWJsaXNoKCdJU19MT0dPVVQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBpc0xvZ2dlZEluOiAoYm9vbEZsYWcgIT09IG51bGwgJiYgYm9vbEZsYWcgIT09ICcnKSA/IEpTT04ucGFyc2UoYm9vbEZsYWcpIDogZmFsc2VcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8Um91dGluZyBpc2xvZ2luPXt0aGlzLnN0YXRlLmlzTG9nZ2VkSW59IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKEFwcCk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NsaWVudC9zcmMvQXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///58\n")}});