webpackHotUpdate(0,{58:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(3);\n\nvar _auth = __webpack_require__(59);\n\nvar _pubsubJs = __webpack_require__(12);\n\nvar _pubsubJs2 = _interopRequireDefault(_pubsubJs);\n\n__webpack_require__(61);\n\nvar _router = __webpack_require__(62);\n\nvar _router2 = _interopRequireDefault(_router);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar App = function (_Component) {\n    _inherits(App, _Component);\n\n    function App(props) {\n        _classCallCheck(this, App);\n\n        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));\n\n        _this.state = {\n            \"isLoggedIn\": window.localStorage.getItem('isLoggedIn'),\n            \"unit\": \"N\", // 'M' is statute miles (default) , 'K' is kilometers  , 'N' is nautical miles\n            \"distanceupto\": 20\n        };\n        _this.mySubscriber = _this.mySubscriber.bind(_this);\n        _pubsubJs2.default.subscribe('IS_LOGIN', _this.mySubscriber);\n        _this.auth = new _auth.Auth();\n        if (_this.state.isLoggedIn) {\n            _this.auth.activeInterval(_this.props.history);\n        } else {\n            _this.auth.stopInterval();\n        }\n\n        return _this;\n    }\n\n    _createClass(App, [{\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n            var _this2 = this;\n\n            this.getCurrentLoc(function () {\n                _this2.getcode();\n            });\n        }\n    }, {\n        key: 'checkDistanceBetweenlocation',\n        value: function checkDistanceBetweenlocation(oldloc, newloc) {\n\n            var lat1 = oldloc.split(\"--\")[0];\n            var lat2 = newloc.latitude;\n\n            var lon1 = oldloc.split(\"--\")[1];\n            var lon2 = newloc.longitude;\n\n            var radlat1 = Math.PI * lat1 / 180;\n            var radlat2 = Math.PI * lat2 / 180;\n            //  var radlon1 = Math.PI * lon1 / 180\n            // var radlon2 = Math.PI * lon2 / 180\n            var theta = lon1 - lon2;\n            var radtheta = Math.PI * theta / 180;\n            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);\n            dist = Math.acos(dist);\n            dist = dist * 180 / Math.PI;\n            dist = dist * 60 * 1.1515;\n            if (this.state.unit === \"K\") {\n                dist = dist * 1.609344;\n            }\n            if (this.state.unit === \"N\") {\n                dist = dist * 0.8684;\n            }\n            console.log(\"Distance Differce b/w Location >>>:\" + dist);\n            return dist;\n        }\n    }, {\n        key: 'getCurrentLoc',\n        value: function getCurrentLoc(callback) {\n            var _this3 = this;\n\n            var distance;\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position) {\n                    if (window.localStorage.getItem('clat-log') === null) {\n                        window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    } else {\n                        distance = _this3.checkDistanceBetweenlocation(window.localStorage.getItem('clat-log'), position.coords);\n                        if (distance > _this3.state.distanceupto) {\n                            window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                            console.log(\">>notification trigger\");\n                            callback();\n                        }\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                }, { timeout: 10000 });\n\n                navigator.geolocation.watchPosition(function (position) {\n                    if (window.localStorage.getItem('clat-log') === null) {\n                        window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    } else {\n                        distance = _this3.checkDistanceBetweenlocation(window.localStorage.getItem('clat-log'), position.coords);\n\n                        if (distance > _this3.state.distanceupto) {\n                            window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                            console.log(\">>notification trigger\");\n                            callback();\n                        }\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                });\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'getcode',\n        value: function getcode() {\n            var _this4 = this;\n\n            var lat,\n                lng = '';\n            if (window.localStorage.getItem('clat-log') !== null) {\n                lat = window.localStorage.getItem('clat-log').split('--')[0];\n                lng = window.localStorage.getItem('clat-log').split('--')[1];\n                var geocoder = new google.maps.Geocoder();\n                var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };\n                geocoder.geocode({ 'location': latlng }, function (results, status) {\n                    if (status === 'OK') {\n                        _this4.getZipcode(results);\n                    } else {\n                        window.alert('Geocoder failed due to: ' + status);\n                    }\n                });\n            }\n        }\n    }, {\n        key: 'getZipcode',\n        value: function getZipcode(place) {\n\n            var zipcodes = [];\n            if (Array.isArray(place)) {\n                for (var k = 0; k < place.length; k++) {\n                    for (var i = 0; i < place[k].address_components.length; i++) {\n                        for (var j = 0; j < place[k].address_components[i].types.length; j++) {\n                            if (place[k].address_components[i].types[j] === \"postal_code\") {\n                                zipcodes.push(place[k].address_components[i].long_name);\n                            }\n                        }\n                    }\n                }\n            } else {\n                for (var i = 0; i < place.address_components.length; i++) {\n                    for (var j = 0; j < place.address_components[i].types.length; j++) {\n                        if (place.address_components[i].types[j] === \"postal_code\") {\n                            zipcodes.push(place.address_components[i].long_name);\n                        }\n                    }\n                }\n            }\n\n            if (zipcodes.length > 0) {\n                window.localStorage.setItem('czipcodes', zipcodes);\n                //Store in IndexDB\n                store.storeinMovedb();\n            }\n        }\n    }, {\n        key: 'saveCurrentLocation',\n        value: function saveCurrentLocation() {\n            if (window.localStorage.getItem('deviceToken') !== null && window.localStorage.getItem('plat-log') !== null) {\n                fetch('/api/whereiam', { method: 'post', headers: { 'Content-Type': 'application/json' },\n                    body: JSON.stringify({\n                        platlng: window.localStorage.getItem('plat-log'),\n                        pzipcodes: window.localStorage.getItem('pzipcodes'),\n                        userId: window.localStorage.getItem('userid'),\n                        token: window.localStorage.getItem('deviceToken')\n                    })\n                }).then(function (res) {\n                    return res.json();\n                }).then(function (json) {\n                    console.log(json);\n                });\n            }\n        }\n    }, {\n        key: 'mySubscriber',\n        value: function mySubscriber(msg, data) {\n\n            if (data.status) {\n                window.localStorage.setItem('accessToken', data.token);\n                window.localStorage.setItem('userid', data.userid);\n                window.localStorage.setItem('isLoggedIn', true);\n                this.auth.activeInterval(this.props.history);\n                //   this.saveCurrentLocation();\n            } else {\n                window.localStorage.removeItem('accessToken');\n                window.localStorage.removeItem('userid');\n                window.localStorage.removeItem('isLoggedIn');\n                this.auth.stopInterval();\n            }\n            this.isLoggedIn(data);\n        }\n    }, {\n        key: 'isLoggedIn',\n        value: function isLoggedIn(data) {\n            var boolFlag = window.localStorage.getItem('isLoggedIn');\n            if (data.hasOwnProperty('callback')) {\n                data.callback();\n            }\n\n            if (!data.status) {\n                _pubsubJs2.default.publish('IS_LOGOUT');\n            }\n\n            this.setState({\n                isLoggedIn: boolFlag !== null && boolFlag !== '' ? JSON.parse(boolFlag) : false\n            });\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return _react2.default.createElement(\n                'div',\n                null,\n                _react2.default.createElement(_router2.default, { islogin: this.state.isLoggedIn })\n            );\n        }\n    }]);\n\n    return App;\n}(_react.Component);\n\nexports.default = (0, _reactRouterDom.withRouter)(App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL0FwcC5qcz9hMGY1Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwic3RhdGUiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibXlTdWJzY3JpYmVyIiwiYmluZCIsIlB1YlN1YiIsInN1YnNjcmliZSIsImF1dGgiLCJBdXRoIiwiaXNMb2dnZWRJbiIsImFjdGl2ZUludGVydmFsIiwiaGlzdG9yeSIsInN0b3BJbnRlcnZhbCIsImdldEN1cnJlbnRMb2MiLCJnZXRjb2RlIiwib2xkbG9jIiwibmV3bG9jIiwibGF0MSIsInNwbGl0IiwibGF0MiIsImxhdGl0dWRlIiwibG9uMSIsImxvbjIiLCJsb25naXR1ZGUiLCJyYWRsYXQxIiwiTWF0aCIsIlBJIiwicmFkbGF0MiIsInRoZXRhIiwicmFkdGhldGEiLCJkaXN0Iiwic2luIiwiY29zIiwiYWNvcyIsInVuaXQiLCJjb25zb2xlIiwibG9nIiwiY2FsbGJhY2siLCJkaXN0YW5jZSIsIm5hdmlnYXRvciIsImdlb2xvY2F0aW9uIiwiZ2V0Q3VycmVudFBvc2l0aW9uIiwicG9zaXRpb24iLCJzZXRJdGVtIiwiY29vcmRzIiwiY2hlY2tEaXN0YW5jZUJldHdlZW5sb2NhdGlvbiIsImRpc3RhbmNldXB0byIsImVycm9yIiwidGltZW91dCIsIndhdGNoUG9zaXRpb24iLCJsYXQiLCJsbmciLCJnZW9jb2RlciIsImdvb2dsZSIsIm1hcHMiLCJHZW9jb2RlciIsImxhdGxuZyIsInBhcnNlRmxvYXQiLCJnZW9jb2RlIiwicmVzdWx0cyIsInN0YXR1cyIsImdldFppcGNvZGUiLCJhbGVydCIsInBsYWNlIiwiemlwY29kZXMiLCJBcnJheSIsImlzQXJyYXkiLCJrIiwibGVuZ3RoIiwiaSIsImFkZHJlc3NfY29tcG9uZW50cyIsImoiLCJ0eXBlcyIsInB1c2giLCJsb25nX25hbWUiLCJzdG9yZSIsInN0b3JlaW5Nb3ZlZGIiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInBsYXRsbmciLCJwemlwY29kZXMiLCJ1c2VySWQiLCJ0b2tlbiIsInRoZW4iLCJyZXMiLCJqc29uIiwibXNnIiwiZGF0YSIsInVzZXJpZCIsInJlbW92ZUl0ZW0iLCJib29sRmxhZyIsImhhc093blByb3BlcnR5IiwicHVibGlzaCIsInNldFN0YXRlIiwicGFyc2UiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFDTUEsRzs7O0FBQ0YsaUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw4R0FDVEEsS0FEUzs7QUFFZixjQUFLQyxLQUFMLEdBQWE7QUFDVCwwQkFBY0MsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsWUFBNUIsQ0FETDtBQUVULG9CQUFRLEdBRkMsRUFFSTtBQUNiLDRCQUFnQjtBQUhQLFNBQWI7QUFLQSxjQUFLQyxZQUFMLEdBQW9CLE1BQUtBLFlBQUwsQ0FBa0JDLElBQWxCLE9BQXBCO0FBQ0FDLDJCQUFPQyxTQUFQLENBQWlCLFVBQWpCLEVBQTZCLE1BQUtILFlBQWxDO0FBQ0EsY0FBS0ksSUFBTCxHQUFZLElBQUlDLFVBQUosRUFBWjtBQUNBLFlBQUksTUFBS1QsS0FBTCxDQUFXVSxVQUFmLEVBQTJCO0FBQ3ZCLGtCQUFLRixJQUFMLENBQVVHLGNBQVYsQ0FBeUIsTUFBS1osS0FBTCxDQUFXYSxPQUFwQztBQUNILFNBRkQsTUFFTztBQUNILGtCQUFLSixJQUFMLENBQVVLLFlBQVY7QUFDSDs7QUFkYztBQWdCbEI7Ozs7NENBRW1CO0FBQUE7O0FBRWhCLGlCQUFLQyxhQUFMLENBQW1CLFlBQU07QUFDckIsdUJBQUtDLE9BQUw7QUFDSCxhQUZEO0FBSUg7OztxREFFNEJDLE0sRUFBUUMsTSxFQUFROztBQUV6QyxnQkFBSUMsT0FBT0YsT0FBT0csS0FBUCxDQUFhLElBQWIsRUFBbUIsQ0FBbkIsQ0FBWDtBQUNBLGdCQUFJ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ZSxXQUFmO0FBQ0g7O0FBRUQsaUJBQUtDLFFBQUwsQ0FBYztBQUNWeEYsNEJBQWFxRixhQUFhLElBQWIsSUFBcUJBLGFBQWEsRUFBbkMsR0FBeUNiLEtBQUtpQixLQUFMLENBQVdKLFFBQVgsQ0FBekMsR0FBZ0U7QUFEbEUsYUFBZDtBQUdIOzs7aUNBQ1E7QUFDTCxtQkFDUTtBQUFBO0FBQUE7QUFDSSw4Q0FBQyxnQkFBRCxJQUFTLFNBQVMsS0FBSy9GLEtBQUwsQ0FBV1UsVUFBN0I7QUFESixhQURSO0FBSUg7Ozs7RUE1TWEwRixnQjs7a0JBK01ILGdDQUFXdEcsR0FBWCxDIiwiZmlsZSI6IjU4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7UHJvcFR5cGVzLCBDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgd2l0aFJvdXRlciB9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XHJcbmltcG9ydCB7QXV0aH0gZnJvbSAnLi9jb21tb24vYXV0aCc7XHJcbmltcG9ydCBQdWJTdWIgZnJvbSAncHVic3ViLWpzJztcclxuaW1wb3J0ICcuL3N0eWxlL2Nzcy9BcHAuc2Nzcyc7XHJcbmltcG9ydCBSb3V0aW5nIGZyb20gJy4vcm91dGVyL3JvdXRlcic7XHJcbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBcImlzTG9nZ2VkSW5cIjogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0xvZ2dlZEluJyksXHJcbiAgICAgICAgICAgIFwidW5pdFwiOiBcIk5cIiwgLy8gJ00nIGlzIHN0YXR1dGUgbWlsZXMgKGRlZmF1bHQpICwgJ0snIGlzIGtpbG9tZXRlcnMgICwgJ04nIGlzIG5hdXRpY2FsIG1pbGVzXHJcbiAgICAgICAgICAgIFwiZGlzdGFuY2V1cHRvXCI6IDIwXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm15U3Vic2NyaWJlciA9IHRoaXMubXlTdWJzY3JpYmVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgUHViU3ViLnN1YnNjcmliZSgnSVNfTE9HSU4nLCB0aGlzLm15U3Vic2NyaWJlcik7XHJcbiAgICAgICAgdGhpcy5hdXRoID0gbmV3IEF1dGgoKTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0xvZ2dlZEluKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aC5hY3RpdmVJbnRlcnZhbCh0aGlzLnByb3BzLmhpc3RvcnkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aC5zdG9wSW50ZXJ2YWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG5cclxuICAgICAgICB0aGlzLmdldEN1cnJlbnRMb2MoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldGNvZGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tEaXN0YW5jZUJldHdlZW5sb2NhdGlvbihvbGRsb2MsIG5ld2xvYykge1xyXG5cclxuICAgICAgICBsZXQgbGF0MSA9IG9sZGxvYy5zcGxpdChcIi0tXCIpWzBdO1xyXG4gICAgICAgIGxldCBsYXQyID0gbmV3bG9jLmxhdGl0dWRlO1xyXG5cclxuICAgICAgICBsZXQgbG9uMSA9IG9sZGxvYy5zcGxpdChcIi0tXCIpWzFdO1xyXG4gICAgICAgIGxldCBsb24yID0gbmV3bG9jLmxvbmdpdHVkZTtcclxuXHJcblxyXG4gICAgICAgIHZhciByYWRsYXQxID0gTWF0aC5QSSAqIGxhdDEgLyAxODA7XHJcbiAgICAgICAgdmFyIHJhZGxhdDIgPSBNYXRoLlBJICogbGF0MiAvIDE4MDtcclxuICAgICAgICAvLyAgdmFyIHJhZGxvbjEgPSBNYXRoLlBJICogbG9uMSAvIDE4MFxyXG4gICAgICAgIC8vIHZhciByYWRsb24yID0gTWF0aC5QSSAqIGxvbjIgLyAxODBcclxuICAgICAgICB2YXIgdGhldGEgPSBsb24xIC0gbG9uMjtcclxuICAgICAgICB2YXIgcmFkdGhldGEgPSBNYXRoLlBJICogdGhldGEgLyAxODA7XHJcbiAgICAgICAgdmFyIGRpc3QgPSBNYXRoLnNpbihyYWRsYXQxKSAqIE1hdGguc2luKHJhZGxhdDIpICsgTWF0aC5jb3MocmFkbGF0MSkgKiBNYXRoLmNvcyhyYWRsYXQyKSAqIE1hdGguY29zKHJhZHRoZXRhKTtcclxuICAgICAgICBkaXN0ID0gTWF0aC5hY29zKGRpc3QpO1xyXG4gICAgICAgIGRpc3QgPSBkaXN0ICogMTgwIC8gTWF0aC5QSTtcclxuICAgICAgICBkaXN0ID0gZGlzdCAqIDYwICogMS4xNTE1O1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnVuaXQgPT09IFwiS1wiKSB7XHJcbiAgICAgICAgICAgIGRpc3QgPSBkaXN0ICogMS42MDkzNDQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnVuaXQgPT09IFwiTlwiKSB7XHJcbiAgICAgICAgICAgIGRpc3QgPSBkaXN0ICogMC44Njg0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkRpc3RhbmNlIERpZmZlcmNlIGIvdyBMb2NhdGlvbiA+Pj46XCIgKyBkaXN0KTtcclxuICAgICAgICByZXR1cm4gZGlzdDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudExvYyhjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBkaXN0YW5jZTtcclxuICAgICAgICBpZiAobmF2aWdhdG9yICYmIG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xyXG4gICAgICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2xhdC1sb2cnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IHRoaXMuY2hlY2tEaXN0YW5jZUJldHdlZW5sb2NhdGlvbih3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsYXQtbG9nJyksIHBvc2l0aW9uLmNvb3Jkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlID4gdGhpcy5zdGF0ZS5kaXN0YW5jZXVwdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGF0LWxvZycsIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj4+bm90aWZpY2F0aW9uIHRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycj5cIiwgZXJyb3IpO1xyXG5cclxuICAgICAgICAgICAgfSwge3RpbWVvdXQ6IDEwMDAwfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLndhdGNoUG9zaXRpb24oKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjbGF0LWxvZycpID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGF0LWxvZycsIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gdGhpcy5jaGVja0Rpc3RhbmNlQmV0d2VlbmxvY2F0aW9uKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2xhdC1sb2cnKSwgcG9zaXRpb24uY29vcmRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlID4gdGhpcy5zdGF0ZS5kaXN0YW5jZXVwdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGF0LWxvZycsIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj4+bm90aWZpY2F0aW9uIHRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyPlwiLCBlcnJvcilcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR2VvbG9jYXRpb24gaXMgbm90IHN1cHBvcnRlZCcpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRjb2RlKCkge1xyXG4gICAgICAgIHZhciBsYXQsIGxuZyA9ICcnO1xyXG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsYXQtbG9nJykgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbGF0ID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjbGF0LWxvZycpLnNwbGl0KCctLScpWzBdO1xyXG4gICAgICAgICAgICBsbmcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsYXQtbG9nJykuc3BsaXQoJy0tJylbMV07XHJcbiAgICAgICAgICAgIHZhciBnZW9jb2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcjtcclxuICAgICAgICAgICAgdmFyIGxhdGxuZyA9IHtsYXQ6IHBhcnNlRmxvYXQobGF0KSwgbG5nOiBwYXJzZUZsb2F0KGxuZyl9O1xyXG4gICAgICAgICAgICBnZW9jb2Rlci5nZW9jb2RlKHsnbG9jYXRpb24nOiBsYXRsbmd9LCAocmVzdWx0cywgc3RhdHVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzID09PSAnT0snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRaaXBjb2RlKHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoJ0dlb2NvZGVyIGZhaWxlZCBkdWUgdG86ICcgKyBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFppcGNvZGUocGxhY2UpIHtcclxuXHJcbiAgICAgICAgdmFyIHppcGNvZGVzID0gW107XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGxhY2UpKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgcGxhY2UubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlc1tqXSA9PT0gXCJwb3N0YWxfY29kZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6aXBjb2Rlcy5wdXNoKHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50c1tpXS5sb25nX25hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzW2pdID09PSBcInBvc3RhbF9jb2RlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgemlwY29kZXMucHVzaChwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0ubG9uZ19uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoemlwY29kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2N6aXBjb2RlcycsIHppcGNvZGVzKTtcclxuICAgICAgICAgICAgLy9TdG9yZSBpbiBJbmRleERCXHJcbiAgICAgICAgICAgIHN0b3JlLnN0b3JlaW5Nb3ZlZGIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUN1cnJlbnRMb2NhdGlvbigpIHtcclxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkZXZpY2VUb2tlbicpICE9PSBudWxsICYmIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmZXRjaCgnL2FwaS93aGVyZWlhbScsIHttZXRob2Q6ICdwb3N0JywgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXRsbmc6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSxcclxuICAgICAgICAgICAgICAgICAgICBwemlwY29kZXM6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHppcGNvZGVzJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJpZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RldmljZVRva2VuJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhqc29uKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbXlTdWJzY3JpYmVyKG1zZywgZGF0YSkge1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY2Nlc3NUb2tlbicsIGRhdGEudG9rZW4pO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJpZCcsIGRhdGEudXNlcmlkKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpc0xvZ2dlZEluJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aC5hY3RpdmVJbnRlcnZhbCh0aGlzLnByb3BzLmhpc3RvcnkpO1xyXG4gICAgICAgICAgICAvLyAgIHRoaXMuc2F2ZUN1cnJlbnRMb2NhdGlvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYWNjZXNzVG9rZW4nKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VyaWQnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdpc0xvZ2dlZEluJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aC5zdG9wSW50ZXJ2YWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0xvZ2dlZEluKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgaXNMb2dnZWRJbihkYXRhKSB7XHJcbiAgICAgICAgdmFyIGJvb2xGbGFnID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0xvZ2dlZEluJyk7XHJcbiAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ2NhbGxiYWNrJykpIHtcclxuICAgICAgICAgICAgZGF0YS5jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFkYXRhLnN0YXR1cykge1xyXG4gICAgICAgICAgICBQdWJTdWIucHVibGlzaCgnSVNfTE9HT1VUJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNMb2dnZWRJbjogKGJvb2xGbGFnICE9PSBudWxsICYmIGJvb2xGbGFnICE9PSAnJykgPyBKU09OLnBhcnNlKGJvb2xGbGFnKSA6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPFJvdXRpbmcgaXNsb2dpbj17dGhpcy5zdGF0ZS5pc0xvZ2dlZElufSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihBcHApO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL0FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///58\n")}});