/*
 * Copyright 2018 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @fileoverview @suppress {uselessCode} */
'require util/polyfill';

$jscomp.polyfill('Array.prototype.flat', function(orig) {
  if (orig) return orig;

  /**
   * Polyfills Array.prototype.flat.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
   *
   * @param {number=} depth
   * @return {!Array<S>}
   * @this {!IArrayLike<T>}
   * @template T, S
   * @suppress {reportUnknownTypes}
   */
  var flat = function(depth) {
    // TODO(sdh): Consider respecting Symbol.species (b/121061255).
    depth = depth === undefined ? 1 : depth;
    var flattened = [];
    var len = this.length;
    for (var i = 0; i < len; i++) {
      var element = this[i];
      if (Array.isArray(element) && depth > 0) {
        var inner = Array.prototype.flat.call(element, depth - 1);
        flattened.push.apply(flattened, inner);
      } else {
        flattened.push(element);
      }
    }
    return flattened;
  };

  return flat;
}, 'es9', 'es5');
