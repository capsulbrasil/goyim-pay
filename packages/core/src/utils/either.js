"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapEither = exports.isRight = exports.isLeft = exports.right = exports.left = void 0;
var left = function (value) { return ({
    _tag: 'Left',
    value: value
}); };
exports.left = left;
var right = function (value) { return ({
    _tag: 'Right',
    value: value
}); };
exports.right = right;
var isLeft = function (either) {
    return either._tag === 'Left';
};
exports.isLeft = isLeft;
var isRight = function (either) {
    return either._tag === 'Right';
};
exports.isRight = isRight;
var unwrapEither = function (either) {
    return either.value;
};
exports.unwrapEither = unwrapEither;
