webpackHotUpdate(0,{58:function(module,exports,__webpack_require__){"use strict";eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(3);\n\nvar _auth = __webpack_require__(59);\n\nvar _pubsubJs = __webpack_require__(12);\n\nvar _pubsubJs2 = _interopRequireDefault(_pubsubJs);\n\n__webpack_require__(61);\n\nvar _router = __webpack_require__(62);\n\nvar _router2 = _interopRequireDefault(_router);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar App = function (_Component) {\n    _inherits(App, _Component);\n\n    function App(props) {\n        _classCallCheck(this, App);\n\n        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));\n\n        _this.state = { \"isLoggedIn\": window.localStorage.getItem('isLoggedIn') };\n        _this.mySubscriber = _this.mySubscriber.bind(_this);\n        _pubsubJs2.default.subscribe('IS_LOGIN', _this.mySubscriber);\n        _this.auth = new _auth.Auth();\n        if (_this.state.isLoggedIn) {\n            _this.auth.activeInterval(_this.props.history);\n        } else {\n            _this.auth.stopInterval();\n        }\n\n        return _this;\n    }\n\n    _createClass(App, [{\n        key: 'initGeolocation',\n        value: function initGeolocation(callback) {\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position) {\n                    if (window.localStorage.getItem('plat-log') === null) {\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                    }\n                    callback();\n                }, function (error) {\n                    console.log(\"err>\", error);\n                }, { timeout: 10000 });\n\n                navigator.geolocation.watchPosition(function (position) {\n                    console.log(position.coords.latitude + \"--\" + position.coords.longitude);\n                    if (window.localStorage.getItem('plat-log') !== position.coords.latitude + \"--\" + position.coords.longitude) {\n                        console.log(\">>>Change in address\");\n                        window.localStorage.setItem('plat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                });\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'componentDidMount',\n        value: function componentDidMount() {\n\n            /* this.initGeolocation( ()=> {\r\n             this.getcode();\r\n             });\r\n             */\n\n            this.getCurrentLoc(function () {\n                //this.getPostalCode();\n            });\n        }\n    }, {\n        key: 'checkDistanceBetweenlocation',\n        value: function checkDistanceBetweenlocation(oldloc, newloc) {\n\n            alert(1);\n        }\n    }, {\n        key: 'getCurrentLoc',\n        value: function getCurrentLoc(callback) {\n            var _this2 = this;\n\n            alert(11);\n            if (navigator && navigator.geolocation) {\n                navigator.geolocation.getCurrentPosition(function (position) {\n                    if (window.localStorage.getItem('clat-log') === null) {\n                        window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    } else {\n                        console.log(\">>>>>>>>>>>\");\n                        _this2.checkDistanceBetweenlocation();\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                }, { timeout: 10000 });\n\n                navigator.geolocation.watchPosition(function (position) {\n                    console.log(position.coords.latitude + \"--\" + position.coords.longitude);\n\n                    if (window.localStorage.getItem('cplat-log') === null) {\n                        window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\n                        callback();\n                    } else {\n\n                        _this2.checkDistanceBetweenlocation();\n\n                        /*\r\n                        if (window.localStorage.getItem('clat-log') !== position.coords.latitude + \"--\" + position.coords.longitude) {\r\n                            window.localStorage.setItem('clat-log', position.coords.latitude + \"--\" + position.coords.longitude);\r\n                        } */\n                    }\n                }, function (error) {\n                    console.log(\"err>\", error);\n                });\n            } else {\n                console.log('Geolocation is not supported');\n            }\n        }\n    }, {\n        key: 'getcode',\n        value: function getcode() {\n            var _this3 = this;\n\n            var lat,\n                lng = '';\n            if (window.localStorage.getItem('cplat-log') !== null) {\n                lat = window.localStorage.getItem('cplat-log').split('--')[0];\n                lng = window.localStorage.getItem('cplat-log').split('--')[1];\n                var geocoder = new google.maps.Geocoder();\n                var latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };\n                geocoder.geocode({ 'location': latlng }, function (results, status) {\n                    if (status === 'OK') {\n                        _this3.getZipcode(results);\n                    } else {\n                        window.alert('Geocoder failed due to: ' + status);\n                    }\n                });\n            }\n        }\n    }, {\n        key: 'getZipcode',\n        value: function getZipcode(place) {\n\n            var zipcodes = [];\n            if (Array.isArray(place)) {\n                for (var k = 0; k < place.length; k++) {\n                    for (var i = 0; i < place[k].address_components.length; i++) {\n                        for (var j = 0; j < place[k].address_components[i].types.length; j++) {\n                            if (place[k].address_components[i].types[j] == \"postal_code\") {\n                                // console.log(place[k].address_components[i].long_name);\n                                zipcodes.push(place[k].address_components[i].long_name);\n                            }\n                        }\n                    }\n                }\n            } else {\n                for (var i = 0; i < place.address_components.length; i++) {\n                    for (var j = 0; j < place.address_components[i].types.length; j++) {\n                        if (place.address_components[i].types[j] == \"postal_code\") {\n                            // console.log(place.address_components[i].long_name);\n                            zipcodes.push(place.address_components[i].long_name);\n                        }\n                    }\n                }\n            }\n            console.log(zipcodes);\n            if (zipcodes.length > 0) {\n                window.localStorage.setItem('czipcodes', zipcodes);\n                //Store in IndexDB\n                // store.storeinIdb();\n            }\n        }\n    }, {\n        key: 'saveCurrentLocation',\n        value: function saveCurrentLocation() {\n            if (window.localStorage.getItem('deviceToken') !== null && window.localStorage.getItem('plat-log') !== null) {\n                fetch('/api/whereiam', { method: 'post', headers: { 'Content-Type': 'application/json' },\n                    body: JSON.stringify({\n                        platlng: window.localStorage.getItem('plat-log'),\n                        pzipcodes: window.localStorage.getItem('pzipcodes'),\n                        userId: window.localStorage.getItem('userid'),\n                        token: window.localStorage.getItem('deviceToken')\n                    })\n                }).then(function (res) {\n                    return res.json();\n                }).then(function (json) {\n                    console.log(json);\n                });\n            }\n        }\n    }, {\n        key: 'mySubscriber',\n        value: function mySubscriber(msg, data) {\n\n            if (data.status) {\n                window.localStorage.setItem('accessToken', data.token);\n                window.localStorage.setItem('userid', data.userid);\n                window.localStorage.setItem('isLoggedIn', true);\n                this.auth.activeInterval(this.props.history);\n                //   this.saveCurrentLocation();\n            } else {\n                window.localStorage.removeItem('accessToken');\n                window.localStorage.removeItem('userid');\n                window.localStorage.removeItem('isLoggedIn');\n                this.auth.stopInterval();\n            }\n            this.isLoggedIn(data);\n        }\n    }, {\n        key: 'isLoggedIn',\n        value: function isLoggedIn(data) {\n            var boolFlag = window.localStorage.getItem('isLoggedIn');\n            if (data.hasOwnProperty('callback')) {\n                data.callback();\n            }\n\n            if (!data.status) {\n                _pubsubJs2.default.publish('IS_LOGOUT');\n            }\n\n            this.setState({\n                isLoggedIn: boolFlag !== null && boolFlag !== '' ? JSON.parse(boolFlag) : false\n            });\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return _react2.default.createElement(\n                'div',\n                null,\n                _react2.default.createElement(_router2.default, { islogin: this.state.isLoggedIn })\n            );\n        }\n    }]);\n\n    return App;\n}(_react.Component);\n\nexports.default = (0, _reactRouterDom.withRouter)(App);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jbGllbnQvc3JjL0FwcC5qcz9hMGY1Il0sIm5hbWVzIjpbIkFwcCIsInByb3BzIiwic3RhdGUiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibXlTdWJzY3JpYmVyIiwiYmluZCIsIlB1YlN1YiIsInN1YnNjcmliZSIsImF1dGgiLCJBdXRoIiwiaXNMb2dnZWRJbiIsImFjdGl2ZUludGVydmFsIiwiaGlzdG9yeSIsInN0b3BJbnRlcnZhbCIsImNhbGxiYWNrIiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsInNldEl0ZW0iLCJjb29yZHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInRpbWVvdXQiLCJ3YXRjaFBvc2l0aW9uIiwiZ2V0Q3VycmVudExvYyIsIm9sZGxvYyIsIm5ld2xvYyIsImFsZXJ0IiwiY2hlY2tEaXN0YW5jZUJldHdlZW5sb2NhdGlvbiIsImxhdCIsImxuZyIsInNwbGl0IiwiZ2VvY29kZXIiLCJnb29nbGUiLCJtYXBzIiwiR2VvY29kZXIiLCJsYXRsbmciLCJwYXJzZUZsb2F0IiwiZ2VvY29kZSIsInJlc3VsdHMiLCJzdGF0dXMiLCJnZXRaaXBjb2RlIiwicGxhY2UiLCJ6aXBjb2RlcyIsIkFycmF5IiwiaXNBcnJheSIsImsiLCJsZW5ndGgiLCJpIiwiYWRkcmVzc19jb21wb25lbnRzIiwiaiIsInR5cGVzIiwicHVzaCIsImxvbmdfbmFtZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicGxhdGxuZyIsInB6aXBjb2RlcyIsInVzZXJJZCIsInRva2VuIiwidGhlbiIsInJlcyIsImpzb24iLCJtc2ciLCJkYXRhIiwidXNlcmlkIiwicmVtb3ZlSXRlbSIsImJvb2xGbGFnIiwiaGFzT3duUHJvcGVydHkiLCJwdWJsaXNoIiwic2V0U3RhdGUiLCJwYXJzZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNNQSxHOzs7QUFDRixpQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLDhHQUNUQSxLQURTOztBQUVmLGNBQUtDLEtBQUwsR0FBYSxFQUFDLGNBQWNDLE9BQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFlBQTVCLENBQWYsRUFBYjtBQUNBLGNBQUtDLFlBQUwsR0FBb0IsTUFBS0EsWUFBTCxDQUFrQkMsSUFBbEIsT0FBcEI7QUFDQUMsMkJBQU9DLFNBQVAsQ0FBaUIsVUFBakIsRUFBNkIsTUFBS0gsWUFBbEM7QUFDQSxjQUFLSSxJQUFMLEdBQVksSUFBSUMsVUFBSixFQUFaO0FBQ0EsWUFBSSxNQUFLVCxLQUFMLENBQVdVLFVBQWYsRUFBMkI7QUFDdkIsa0JBQUtGLElBQUwsQ0FBVUcsY0FBVixDQUF5QixNQUFLWixLQUFMLENBQVdhLE9BQXBDO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsa0JBQUtKLElBQUwsQ0FBVUssWUFBVjtBQUNIOztBQVZjO0FBWWxCOzs7O3dDQUVlQyxRLEVBQVU7QUFDdEIsZ0JBQUlDLGFBQWFBLFVBQVVDLFdBQTNCLEVBQXdDO0FBQ3BDRCwwQkFBVUMsV0FBVixDQUFzQkMsa0JBQXRCLENBQXlDLFVBQUNDLFFBQUQsRUFBYztBQUNuRCx3QkFBSWpCLE9BQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFVBQTVCLE1BQTRDLElBQWhELEVBQXNEO0FBQ2xERiwrQkFBT0MsWUFBUCxDQUFvQmlCLE9BQXBCLENBQTRCLFVBQTVCLEVBQXdDRCxTQUFTRSxNQUFULENBQWdCQyxRQUFoQixHQUEyQixJQUEzQixHQUFrQ0gsU0FBU0UsTUFBVCxDQUFnQkUsU0FBMUY7QUFDSDtBQUNEUjtBQUNILGlCQUxELEVBS0csVUFBVVMsS0FBVixFQUFpQjtBQUNoQkMsNEJBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CRixLQUFwQjtBQUVILGlCQVJELEVBUUcsRUFBQ0csU0FBUyxLQUFWLEVBUkg7O0FBVUFYLDBCQUFVQyxXQUFWLENBQXNCVyxhQUF0QixDQUFvQyxVQUFDVCxRQUFELEVBQWM7QUFDOUNNLDRCQUFRQyxHQUFSLENBQVlQLFNBQVNFLE1BQVQsQ0FBZ0JDLFFBQWhCLEdBQTJCLElBQTNCLEdBQWtDSCxTQUFTRSxNQUFULENBQWdCRSxTQUE5RDtBQUNBLHdCQUFJckIsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsVUFBNUIsTUFBNENlLFNBQVNFLE1BQVQsQ0FBZ0JDLFFBQWhCLEdBQTJCLElBQTNCLEdBQWtDSCxTQUFTRSxNQUFULENBQWdCRSxTQUFsRyxFQUE2RztBQUN6R0UsZ0NBQVFDLEdBQVIsQ0FBWSxzQkFBWjtBQUNBeEIsK0JBQU9DLFlBQVAsQ0FBb0JpQixPQUFwQixDQUE0QixVQUE1QixFQUF3Q0QsU0FBU0UsTUFBVCxDQUFnQkMsUUFBaEIsR0FBMkIsSUFBM0IsR0FBa0NILFNBQVNFLE1BQVQsQ0FBZ0JFLFNBQTFGO0FBQ0FSO0FBQ0g7QUFFSixpQkFSRCxFQVFHLFVBQVVTLEtBQVYsRUFBaUI7QUFDaEJDLDRCQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQkYsS0FBcEI7QUFDSCxpQkFWRDtBQWFILGFBeEJELE1Bd0JPO0FBQ0hDLHdCQUFRQyxHQUFSLENBQVksOEJBQVo7QUFDSDtBQUNKOzs7NENBRW1COztBQUVoQjs7Ozs7QUFNQSxpQkFBS0csYUFBTCxDQUFtQixZQUFNO0FBQ3JCO0FBQ0gsYUFGRDtBQUlIOzs7cURBRTRCQyxNLEVBQVFDLE0sRUFBTzs7QUFFeENDLGtCQUFNLENBQU47QUFHSDs7O3NDQUVhakIsUSxFQUFVO0FBQUE7O0FBQ3BCaUIsa0JBQU0sRUFBTjtBQUNBLGdCQUFJaEIsYUFBYUEsVUFBVUMsV0FBM0IsRUFBd0M7QUFDcENELDBCQUFVQyxXQUFWLENBQXNCQyxrQkFBdEIsQ0FBeUMsVUFBQ0MsUUFBRCxFQUFjO0FBQ25ELHdCQUFJakIsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsVUFBNUIsTUFBNEMsSUFBaEQsRUFBc0Q7QUFDbERGLCtCQUFPQyxZQUFQLENBQW9CaUIsT0FBcEIsQ0FBNEIsVUFBNUIsRUFBd0NELFNBQVNFLE1BQVQsQ0FBZ0JDLFFBQWhCLEdBQTJCLElBQTNCLEdBQWtDSCxTQUFTRSxNQUFULENBQWdCRSxTQUExRjtBQUNBUjtBQUNILHFCQUhELE1BR087QUFDSFUsZ0NBQVFDLEdBQVIsQ0FBWSxhQUFaO0FBQ0EsK0JBQUtPLDRCQUFMO0FBQ0g7QUFFSixpQkFURCxFQVNHLFVBQVVULEtBQVYsRUFBaUI7QUFDaEJDLDRCQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQkYsS0FBcEI7QUFFSCxpQkFaRCxFQVlHLEVBQUNHLFNBQVMsS0FBVixFQVpIOztBQWlCQVgsMEJBQVVDLFdBQVYsQ0FBc0JXLGFBQXRCLENBQW9DLFVBQUNULFFBQUQsRUFBYztBQUM5Q00sNEJBQVFDLEdBQVIsQ0FBWVAsU0FBU0UsTUFBVCxDQUFnQkMsUUFBaEIsR0FBMkIsSUFBM0IsR0FBa0NILFNBQVNFLE1BQVQsQ0FBZ0JFLFNBQTlEOztBQUVBLHdCQUFJckIsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsV0FBNUIsTUFBNkMsSUFBakQsRUFBdUQ7QUFDbkRGLCtCQUFPQyxZQUFQLENBQW9CaUIsT0FBcEIsQ0FBNEIsVUFBNUIsRUFBd0NELFNBQVNFLE1BQVQsQ0FBZ0JDLFFBQWhCLEdBQTJCLElBQTNCLEdBQWtDSCxTQUFTRSxNQUFULENBQWdCRSxTQUExRjtBQUNBUjtBQUNILHFCQUhELE1BR087O0FBRVgsK0JBQUtrQiw0QkFBTDs7QUFFUTs7OztBQUlIO0FBSUosaUJBbEJELEVBa0JHLFVBQVVULEtBQVYsRUFBaUI7QUFDaEJDLDRCQUFRQyxHQUFSLENBQVksTUFBWixFQUFvQkYsS0FBcEI7QUFDSCxpQkFwQkQ7QUF1QkgsYUF6Q0QsTUF5Q087QUFDSEMsd0JBQVFDLEdBQVIsQ0FBWSw4QkFBWjtBQUNIO0FBSUo7OztrQ0FFUztBQUFBOztBQUNOLGdCQUFJUSxHQUFKO0FBQUEsZ0JBQVNDLE1BQU0sRUFBZjtBQUNBLGdCQUFJakMsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsV0FBNUIsTUFBNkMsSUFBakQsRUFBdUQ7QUFDbkQ4QixzQkFBTWhDLE9BQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFdBQTVCLEVBQXlDZ0MsS0FBekMsQ0FBK0MsSUFBL0MsRUFBcUQsQ0FBckQsQ0FBTjtBQUNBRCxzQkFBTWpDLE9BQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFdBQTVCLEVBQXlDZ0MsS0FBekMsQ0FBK0MsSUFBL0MsRUFBcUQsQ0FBckQsQ0FBTjtBQUNBLG9CQUFJQyxXQUFXLElBQUlDLE9BQU9DLElBQVAsQ0FBWUMsUUFBaEIsRUFBZjtBQUNBLG9CQUFJQyxTQUFTLEVBQUNQLEtBQUtRLFdBQVdSLEdBQVgsQ0FBTixFQUF1QkMsS0FBS08sV0FBV1AsR0FBWCxDQUE1QixFQUFiO0FBQ0FFLHlCQUFTTSxPQUFULENBQWlCLEVBQUMsWUFBWUYsTUFBYixFQUFqQixFQUF1QyxVQUFDRyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDeEQsd0JBQUlBLFdBQVcsSUFBZixFQUFxQjtBQUNqQiwrQkFBS0MsVUFBTCxDQUFnQkYsT0FBaEI7QUFDSCxxQkFGRCxNQUVPO0FBQ0gxQywrQkFBTzhCLEtBQVAsQ0FBYSw2QkFBNkJhLE1BQTFDO0FBQ0g7QUFDSixpQkFORDtBQVFIO0FBQ0o7OzttQ0FFVUUsSyxFQUFPOztBQUVkLGdCQUFJQyxXQUFXLEVBQWY7QUFDQSxnQkFBSUMsTUFBTUMsT0FBTixDQUFjSCxLQUFkLENBQUosRUFBMEI7QUFDdEIscUJBQUssSUFBSUksSUFBSSxDQUFiLEVBQWdCQSxJQUFJSixNQUFNSyxNQUExQixFQUFrQ0QsR0FBbEMsRUFBdUM7QUFDbkMseUJBQUssSUFBSUUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJTixNQUFNSSxDQUFOLEVBQVNHLGtCQUFULENBQTRCRixNQUFoRCxFQUF3REMsR0FBeEQsRUFBNkQ7QUFDekQsNkJBQUssSUFBSUUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJUixNQUFNSSxDQUFOLEVBQVNHLGtCQUFULENBQTRCRCxDQUE1QixFQUErQkcsS0FBL0IsQ0FBcUNKLE1BQXpELEVBQWlFRyxHQUFqRSxFQUFzRTtBQUNsRSxnQ0FBSVIsTUFBTUksQ0FBTixFQUFTRyxrQkFBVCxDQUE0QkQsQ0FBNUIsRUFBK0JHLEtBQS9CLENBQXFDRCxDQUFyQyxLQUEyQyxhQUEvQyxFQUE4RDtBQUMxRDtBQUNBUCx5Q0FBU1MsSUFBVCxDQUFjVixNQUFNSSxDQUFOLEVBQVNHLGtCQUFULENBQTRCRCxDQUE1QixFQUErQkssU0FBN0M7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQUNKLGFBWEQsTUFXTztBQUNILHFCQUFLLElBQUlMLElBQUksQ0FBYixFQUFnQkEsSUFBSU4sTUFBTU8sa0JBQU4sQ0FBeUJGLE1BQTdDLEVBQXFEQyxHQUFyRCxFQUEwRDtBQUN0RCx5QkFBSyxJQUFJRSxJQUFJLENBQWIsRUFBZ0JBLElBQUlSLE1BQU1PLGtCQUFOLENBQXlCRCxDQUF6QixFQUE0QkcsS0FBNUIsQ0FBa0NKLE1BQXRELEVBQThERyxHQUE5RCxFQUFtRTtBQUMvRCw0QkFBSVIsTUFBTU8sa0JBQU4sQ0FBeUJELENBQXpCLEVBQTRCRyxLQUE1QixDQUFrQ0QsQ0FBbEMsS0FBd0MsYUFBNUMsRUFBMkQ7QUFDdkQ7QUFDQVAscUNBQVNTLElBQVQsQ0FBY1YsTUFBTU8sa0JBQU4sQ0FBeUJELENBQXpCLEVBQTRCSyxTQUExQztBQUNIO0FBQ0o7QUFDSjtBQUVKO0FBQ0RqQyxvQkFBUUMsR0FBUixDQUFZc0IsUUFBWjtBQUNBLGdCQUFJQSxTQUFTSSxNQUFULEdBQWtCLENBQXRCLEVBQXlCO0FBQ3JCbEQsdUJBQU9DLFlBQVAsQ0FBb0JpQixPQUFwQixDQUE0QixXQUE1QixFQUF5QzRCLFFBQXpDO0FBQ0E7QUFDRDtBQUNGO0FBQ0o7Ozs4Q0FFcUI7QUFDbEIsZ0JBQUk5QyxPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixhQUE1QixNQUErQyxJQUEvQyxJQUF1REYsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsVUFBNUIsTUFBNEMsSUFBdkcsRUFBNkc7QUFDekd1RCxzQkFBTSxlQUFOLEVBQXVCLEVBQUNDLFFBQVEsTUFBVCxFQUFpQkMsU0FBUyxFQUFDLGdCQUFnQixrQkFBakIsRUFBMUI7QUFDbkJDLDBCQUFNQyxLQUFLQyxTQUFMLENBQWU7QUFDakJDLGlDQUFTL0QsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsVUFBNUIsQ0FEUTtBQUVqQjhELG1DQUFXaEUsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsV0FBNUIsQ0FGTTtBQUdqQitELGdDQUFRakUsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsUUFBNUIsQ0FIUztBQUlqQmdFLCtCQUFPbEUsT0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsYUFBNUI7QUFKVSxxQkFBZjtBQURhLGlCQUF2QixFQU9HaUUsSUFQSCxDQU9RO0FBQUEsMkJBQU9DLElBQUlDLElBQUosRUFBUDtBQUFBLGlCQVBSLEVBTzJCRixJQVAzQixDQU9nQyxnQkFBUTtBQUNwQzVDLDRCQUFRQyxHQUFSLENBQVk2QyxJQUFaO0FBQ0gsaUJBVEQ7QUFVSDtBQUNKOzs7cUNBRVlDLEcsRUFBS0MsSSxFQUFNOztBQUVwQixnQkFBSUEsS0FBSzVCLE1BQVQsRUFBaUI7QUFDYjNDLHVCQUFPQyxZQUFQLENBQW9CaUIsT0FBcEIsQ0FBNEIsYUFBNUIsRUFBMkNxRCxLQUFLTCxLQUFoRDtBQUNBbEUsdUJBQU9DLFlBQVAsQ0FBb0JpQixPQUFwQixDQUE0QixRQUE1QixFQUFzQ3FELEtBQUtDLE1BQTNDO0FBQ0F4RSx1QkFBT0MsWUFBUCxDQUFvQmlCLE9BQXBCLENBQTRCLFlBQTVCLEVBQTBDLElBQTFDO0FBQ0EscUJBQUtYLElBQUwsQ0FBVUcsY0FBVixDQUF5QixLQUFLWixLQUFMLENBQVdhLE9BQXBDO0FBQ0E7QUFDSCxhQU5ELE1BTU87QUFDSFgsdUJBQU9DLFlBQVAsQ0FBb0J3RSxVQUFwQixDQUErQixhQUEvQjtBQUNBekUsdUJBQU9DLFlBQVAsQ0FBb0J3RSxVQUFwQixDQUErQixRQUEvQjtBQUNBekUsdUJBQU9DLFlBQVAsQ0FBb0J3RSxVQUFwQixDQUErQixZQUEvQjtBQUNBLHFCQUFLbEUsSUFBTCxDQUFVSyxZQUFWO0FBQ0g7QUFDRCxpQkFBS0gsVUFBTCxDQUFnQjhELElBQWhCO0FBQ0g7OzttQ0FDVUEsSSxFQUFNO0FBQ2IsZ0JBQUlHLFdBQVcxRSxPQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixZQUE1QixDQUFmO0FBQ0EsZ0JBQUlxRSxLQUFLSSxjQUFMLENBQW9CLFVBQXBCLENBQUosRUFBcUM7QUFDakNKLHFCQUFLMUQsUUFBTDtBQUNIOztBQUVELGdCQUFJLENBQUMwRCxLQUFLNUIsTUFBVixFQUFrQjtBQUNkdEMsbUNBQU91RSxPQUFQLENBQWUsV0FBZjtBQUNIOztBQUVELGlCQUFLQyxRQUFMLENBQWM7QUFDVnBFLDRCQUFhaUUsYUFBYSxJQUFiLElBQXFCQSxhQUFhLEVBQW5DLEdBQXlDYixLQUFLaUIsS0FBTCxDQUFXSixRQUFYLENBQXpDLEdBQWdFO0FBRGxFLGFBQWQ7QUFHSDs7O2lDQUNRO0FBQ0wsbUJBQ1E7QUFBQTtBQUFBO0FBQ0ksOENBQUMsZ0JBQUQsSUFBUyxTQUFTLEtBQUszRSxLQUFMLENBQVdVLFVBQTdCO0FBREosYUFEUjtBQUlIOzs7O0VBMU5hc0UsZ0I7O2tCQTZOSCxnQ0FBV2xGLEdBQVgsQyIsImZpbGUiOiI1OC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlcywgQ29tcG9uZW50fSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tIFwicmVhY3Qtcm91dGVyLWRvbVwiO1xyXG5pbXBvcnQge0F1dGh9IGZyb20gJy4vY29tbW9uL2F1dGgnO1xyXG5pbXBvcnQgUHViU3ViIGZyb20gJ3B1YnN1Yi1qcyc7XHJcbmltcG9ydCAnLi9zdHlsZS9jc3MvQXBwLnNjc3MnO1xyXG5pbXBvcnQgUm91dGluZyBmcm9tICcuL3JvdXRlci9yb3V0ZXInO1xyXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcImlzTG9nZ2VkSW5cIjogd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0xvZ2dlZEluJyl9O1xyXG4gICAgICAgIHRoaXMubXlTdWJzY3JpYmVyID0gdGhpcy5teVN1YnNjcmliZXIuYmluZCh0aGlzKTtcclxuICAgICAgICBQdWJTdWIuc3Vic2NyaWJlKCdJU19MT0dJTicsIHRoaXMubXlTdWJzY3JpYmVyKTtcclxuICAgICAgICB0aGlzLmF1dGggPSBuZXcgQXV0aCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzTG9nZ2VkSW4pIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLmFjdGl2ZUludGVydmFsKHRoaXMucHJvcHMuaGlzdG9yeSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLnN0b3BJbnRlcnZhbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEdlb2xvY2F0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcclxuICAgICAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocG9zaXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BsYXQtbG9nJywgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyPlwiLCBlcnJvcik7XHJcblxyXG4gICAgICAgICAgICB9LCB7dGltZW91dDogMTAwMDB9KTtcclxuXHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSlcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXQtbG9nJykgIT09IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj4+PkNoYW5nZSBpbiBhZGRyZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGxhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycj5cIiwgZXJyb3IpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcblxyXG4gICAgICAgIC8qIHRoaXMuaW5pdEdlb2xvY2F0aW9uKCAoKT0+IHtcclxuICAgICAgICAgdGhpcy5nZXRjb2RlKCk7XHJcbiAgICAgICAgIH0pO1xyXG4gICAgICAgICAqL1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5nZXRDdXJyZW50TG9jKCgpID0+IHtcclxuICAgICAgICAgICAgLy90aGlzLmdldFBvc3RhbENvZGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNoZWNrRGlzdGFuY2VCZXR3ZWVubG9jYXRpb24ob2xkbG9jICxuZXdsb2Mpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGFsZXJ0KDEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRMb2MoY2FsbGJhY2spIHtcclxuICAgICAgICBhbGVydCgxMSlcclxuICAgICAgICBpZiAobmF2aWdhdG9yICYmIG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xyXG4gICAgICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2xhdC1sb2cnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj4+Pj4+Pj4+Pj4+XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja0Rpc3RhbmNlQmV0d2VlbmxvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyPlwiLCBlcnJvcik7XHJcblxyXG4gICAgICAgICAgICB9LCB7dGltZW91dDogMTAwMDB9KTtcclxuXHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocG9zaXRpb24uY29vcmRzLmxhdGl0dWRlICsgXCItLVwiICsgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSlcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjcGxhdC1sb2cnKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2xhdC1sb2cnLCBwb3NpdGlvbi5jb29yZHMubGF0aXR1ZGUgKyBcIi0tXCIgKyBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tEaXN0YW5jZUJldHdlZW5sb2NhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NsYXQtbG9nJykgIT09IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGF0LWxvZycsIHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZSArIFwiLS1cIiArIHBvc2l0aW9uLmNvb3Jkcy5sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gKi9cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycj5cIiwgZXJyb3IpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dlb2xvY2F0aW9uIGlzIG5vdCBzdXBwb3J0ZWQnKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Y29kZSgpIHtcclxuICAgICAgICB2YXIgbGF0LCBsbmcgPSAnJztcclxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjcGxhdC1sb2cnKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsYXQgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NwbGF0LWxvZycpLnNwbGl0KCctLScpWzBdO1xyXG4gICAgICAgICAgICBsbmcgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NwbGF0LWxvZycpLnNwbGl0KCctLScpWzFdO1xyXG4gICAgICAgICAgICB2YXIgZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXI7XHJcbiAgICAgICAgICAgIHZhciBsYXRsbmcgPSB7bGF0OiBwYXJzZUZsb2F0KGxhdCksIGxuZzogcGFyc2VGbG9hdChsbmcpfTtcclxuICAgICAgICAgICAgZ2VvY29kZXIuZ2VvY29kZSh7J2xvY2F0aW9uJzogbGF0bG5nfSwgKHJlc3VsdHMsIHN0YXR1cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PT0gJ09LJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0WmlwY29kZShyZXN1bHRzKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KCdHZW9jb2RlciBmYWlsZWQgZHVlIHRvOiAnICsgc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFppcGNvZGUocGxhY2UpIHtcclxuXHJcbiAgICAgICAgdmFyIHppcGNvZGVzID0gW107XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGxhY2UpKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgcGxhY2UubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2Vba10uYWRkcmVzc19jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlc1tqXSA9PSBcInBvc3RhbF9jb2RlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsYWNlW2tdLmFkZHJlc3NfY29tcG9uZW50c1tpXS5sb25nX25hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgemlwY29kZXMucHVzaChwbGFjZVtrXS5hZGRyZXNzX2NvbXBvbmVudHNbaV0ubG9uZ19uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlc1tqXSA9PSBcInBvc3RhbF9jb2RlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLmxvbmdfbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHppcGNvZGVzLnB1c2gocGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLmxvbmdfbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh6aXBjb2Rlcyk7XHJcbiAgICAgICAgaWYgKHppcGNvZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjemlwY29kZXMnLCB6aXBjb2Rlcyk7XHJcbiAgICAgICAgICAgIC8vU3RvcmUgaW4gSW5kZXhEQlxyXG4gICAgICAgICAgIC8vIHN0b3JlLnN0b3JlaW5JZGIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUN1cnJlbnRMb2NhdGlvbigpIHtcclxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkZXZpY2VUb2tlbicpICE9PSBudWxsICYmIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmZXRjaCgnL2FwaS93aGVyZWlhbScsIHttZXRob2Q6ICdwb3N0JywgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXRsbmc6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxhdC1sb2cnKSxcclxuICAgICAgICAgICAgICAgICAgICBwemlwY29kZXM6IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHppcGNvZGVzJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJpZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RldmljZVRva2VuJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpLnRoZW4oanNvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhqc29uKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbXlTdWJzY3JpYmVyKG1zZywgZGF0YSkge1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5zdGF0dXMpIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhY2Nlc3NUb2tlbicsIGRhdGEudG9rZW4pO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3VzZXJpZCcsIGRhdGEudXNlcmlkKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpc0xvZ2dlZEluJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aC5hY3RpdmVJbnRlcnZhbCh0aGlzLnByb3BzLmhpc3RvcnkpO1xyXG4gICAgICAgICAgICAvLyAgIHRoaXMuc2F2ZUN1cnJlbnRMb2NhdGlvbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYWNjZXNzVG9rZW4nKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VyaWQnKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdpc0xvZ2dlZEluJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aC5zdG9wSW50ZXJ2YWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0xvZ2dlZEluKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgaXNMb2dnZWRJbihkYXRhKSB7XHJcbiAgICAgICAgdmFyIGJvb2xGbGFnID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0xvZ2dlZEluJyk7XHJcbiAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoJ2NhbGxiYWNrJykpIHtcclxuICAgICAgICAgICAgZGF0YS5jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFkYXRhLnN0YXR1cykge1xyXG4gICAgICAgICAgICBQdWJTdWIucHVibGlzaCgnSVNfTE9HT1VUJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgaXNMb2dnZWRJbjogKGJvb2xGbGFnICE9PSBudWxsICYmIGJvb2xGbGFnICE9PSAnJykgPyBKU09OLnBhcnNlKGJvb2xGbGFnKSA6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPFJvdXRpbmcgaXNsb2dpbj17dGhpcy5zdGF0ZS5pc0xvZ2dlZElufSAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2l0aFJvdXRlcihBcHApO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jbGllbnQvc3JjL0FwcC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///58\n")}});