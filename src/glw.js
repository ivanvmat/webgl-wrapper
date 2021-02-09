var glw = { };

//#region  Math
glw.Vector2 = function ( x = 0, y = x ) {
	this.x = x;
	this.y = y;
};
glw.Vector2.prototype = {

	constructor: glw.Vector2,

    /**
	 * Set the components of a vector to the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 */
	set: function (x, y = x) {
        this.x = x;
		this.y = y;
        return this;
	},

    /**
	 * Copy the values from vector
	 *
	 * @param {Vector2} v the vector operand
	 */
    copy: function (v) {
        this.x = v.x;
		this.y = v.y;
        return this;
	},

    /**
	 * Adds two vectors
	 *
	 * @param {Vector2} va the first vector operand
	 * @param {Vector2} vb the second vector operand
	 */
	add: function (va, vb) {
        if (vb) {
            this.x = va.x + vb.x;
		    this.y = va.y + vb.y;
        }
        else {
            this.x = this.x + va.x;
		    this.y = this.y + va.y;
        }
        return this;
    },

     /**
	 * Subtracts first vector from second vector
	 *
	 * @param {Vector2} va the first vector operand
	 * @param {Vector2} vb the second vector operand
	 */
    sub: function (va, vb) {
        if (vb){
            this.x = va.x - vb.x;
		    this.y = va.y - vb.y;
        }
        else{
            this.x = this.x - va.x;
		    this.y = this.y - va.y;
        }   
	    return this;
	},

    /**
	 * Multiplies with vector
	 *
	 * @param {Vector2} v the vector operand
	 */
	multiply: function (v) {
        if (v instanceof glw.Vector2){
            this.x = this.x * v.x;
		    this.y = this.y * v.y;
        }
        else{
            return this.scale(v);
        }    
	    return this;
    },

    /**
	 * Divides with vector
	 *
	 * @param {Vector2} v the vector operand
	 */
    divide: function (v) {
        if (v instanceof glw.Vector2){
            this.x = this.x / v.x;
		    this.y = this.y / v.y;
        }
        else{
            return this.scale(1 / v);
        }       
	    return this;
    },

    /**
	 * Returns the inverse of the components of a vector
	 *
	 * @param {Vector2} v the vector operand
	 */
    inverse: function (v = this) {
        this.x = 1.0 / v.x;
		this.y = 1.0 / v.y;
        return this;
	},
	
	/**
	 * Calculates the length of a vector
	 * 
	 * @returns {Number} length of vector
	 */
    length: function () {
        let x = this.x;
		let	y = this.y;
        return Math.sqrt(x * x + y * y);
	},

    /**
	 * Calculates the euclidian distance to vector
	 *
	 * @param {Vector2} v the vector operand
	 * @returns {Number} distance to vector v
	 */
	distance: function (v) {
		if (v) {
            let x = v.x - this.x;
			let y = v.y - this.y;
            return Math.sqrt(x * x + y * y);
        }
        else{
            return this.length();
        }    
	},

    /**
	 * Calculates the squared length of a vector
	 * 
	 * @returns {Number} squared length of vector
	 */
	squaredLength: function () {
		let x = this.x;
		let y = this.y;
		return x * x + y * y;
	},

    /**
	 * Calculates the squared euclidian distance to vector
	 *
	 * @param {Vector2} v the vector operand
	 * @returns {Number} squared distance to vector v
	 */
	squaredDistance: function (v) {
		let x = v.x - this.x;
		let y = v.y - this.y;
		return x * x + y * y;
	},

    /**
	 * Negates the components of a vector
	 *
	 * @param {Vector2} v the vector operand
	 */
	negate: function (v = this) {
        this.x = -v.x;
		this.y = -v.y;
        return this;
    },

    /**
	 * Computes the cross product of two vectors
	 * Note that the cross product returns a scalar
	 *
	 * @param {Vector2} va the first vector operand
	 * @param {Vector2} vb the second vector operand
	 * @returns {Number} cross product of vector va and vector vb
	 */
    cross: function (va, vb) {
		if (vb){
            return va.x * vb.y - va.y * vb.x;
        }
        else{
            return this.x * vb.y - this.y * vb.x;
        }
    },

    /**
	 * Scales a vector by a scalar number
	 *
	 * @param {Number} s the scale number
	 */
    scale: function (s) {
        this.x = this.x * s;
		this.y = this.y * s;
        return this;
    },

    /**
	 * Normalize a vector
	 */
    normalize: function () {
		let len = this.x * this.x + this.y * this.y;
		if (len > 0) {
			len = 1 / Math.sqrt(len);
		}
		this.x = this.x * len;
		this.y = this.y * len;
        return this;
    },

    /**
	 * Calculates the dot product with vector
	 *
	 * @param {Vector2} v the vector operand
	 * @returns {Number} dot product with vector v
	 */
    dot: function (v) {
        return this.x * v.x + this.y * v.y;
    },

    /**
	 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
	 *
	 * @param {Vector2} v vector operand
	 * @returns {Boolean} True if the vectors are equal, false if not
	 */
    equals: function (v) {
        return this.x === v.x && this.y === v.y;
    },

    /**
     * Transforms the vector with a matrix3
     * 3rd vector component is implicitly '1'
     *
     * @param {Matrix3} mat3 the matrix operand
     */
	applyMatrix3: function (mat3) {
        this.x = mat3.m00 * this.x + mat3.m10 * this.y + mat3.m20;
        this.y = mat3.m01 * this.x + mat3.m11 * this.y + mat3.m21;
        return this;
    },

    /**
	 * Transforms the vector with a matrix4
	 * 3rd vector component is implicitly '0'
	 * 4th vector component is implicitly '1'
	 *
	 * @param {Matrix4} mat4 the matrix operand
	 */
    applyMatrix4: function (mat4) {
        this.x = mat4.m00 * this.x + mat4.m10 * this.y + mat4.m30;
		this.y = mat4.m01 * this.x + mat4.m11 * this.y + mat4.m31;
        return this;
    },

    /**
	 * Performs a linear interpolation between two vectors
	 *
	 * @param {Vector2} v vector operand
	 * @param {Number} t interpolation amount between the two inputs
	 */
    lerp: function (v, t) {
        this.x = this.x + t * (v.x - this.x);
		this.y = this.y + t * (v.y - this.y);
		return this;
    },

	/**
	 * Clones the vector
	 *
	 * @returns {Vector2} cloned vector
	 */
    clone: function () {
        return new glw.Vector2(this.x, this.y);
    },

	/**
	 * Creates the vector from array
	 */
    fromArray: function (a, o = 0) {
        this.x = a[o];
        this.y = a[o + 1];
        return this;
    },

	/**
	 * Creates the array from vector
	 *
	 * @returns {array} array with vector values
	 */
    toArray: function (a = [], o = 0) {
        a[o] = this.x;
        a[o + 1] = this.y;
        return a;
    }
};

glw.Vector3 = function ( x = 0, y = x, z = x ) {
	this.x = x;
	this.y = y;
	this.z = z;
};
glw.Vector3.prototype = {
	
	constructor: glw.Vector3,
    
    /**
	 * Set the components of a vector to the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 */
	set: function (x, y = x, z = x) {
        this.x = x;
		this.y = y;
		this.z = z;
        return this;
	},

    /**
	 * Copy the values from vector
	 *
	 * @param {Vector3} v the vector operand
	 */
    copy: function (v) {
        this.x = v.x;
		this.y = v.y;
		this.z = v.z;
        return this;
    },

    /**
	 * Adds two vectors
	 *
	 * @param {Vector3} va the first vector operand
	 * @param {Vector3} vb the second vector operand
	 */
    add: function (va, vb) {
        if (vb) {
            this.x = va.x + vb.x;
            this.y = va.y + vb.y;
            this.z = va.z + vb.z;
        }
        else {
            this.x = this.x + va.x;
            this.y = this.y + va.y;
            this.z = this.z + va.z;
        }    
        return this;
    },

    /**
	 * Subtracts first vector from second vector
	 *
	 * @param {Vector3} va the first vector operand
	 * @param {Vector3} vb the second vector operand
	 */
    sub: function (va, vb) {
        if (vb) {
            this.x = va.x - vb.x;
            this.y = va.y - vb.y;
            this.z = va.z - vb.z;
        }
        else {
            this.x = this.x - va.x;
            this.y = this.y - va.y;
            this.z = this.z - va.z;
        }    
        return this;
    },

    /**
	 * Multiplies with vector
	 *
	 * @param {Vector3} v the vector operand
	 */
    multiply: function (v) {
        if (v instanceof glw.Vector3) {
            this.x = this.x * v.x;
            this.y = this.y * v.y;
            this.z = this.z * v.z;
        }
        else {
            return this.scale(v);
        }    
        return this;
    },

    /**
	 * Divides with vector
	 *
	 * @param {Vector3} v the vector operand
	 */
    divide: function (v) {
        if (v instanceof glw.Vector3) {
            this.x = this.x / v.x;
            this.y = this.y / v.y;
            this.z = this.z / v.z;
        }
        else{
            return this.scale(1 / v);
        }    
        return this;
    },

    /**
	 * Returns the inverse of the components of a vector
	 *
	 * @param {Vector3} v the vector operand
	 */
    inverse: function (v = this) {
        this.x = 1.0 / v.x;
		this.y = 1.0 / v.y;
		this.z = 1.0 / v.z;
        return this;
    },

    /**
	 * Calculates the length of a vector
	 *
	 * @returns {Number} length of vector
	 */
    length: function () {
        let x = this.x;
		let y = this.y;
		let z = this.z;
		return Math.sqrt(x * x + y * y + z * z);
    },

    /**
	 * Calculates the euclidian distance to vector
	 *
	 * @param {Vector3} v the vector operand
	 * @returns {Number} distance to vector v
	 */
    distance: function (v) {
        if (v) {
            let x = v.x - this.x;
            let y = v.y - this.y;
            let z = v.z - this.z;
            return Math.sqrt(x * x + y * y + z * z);
        }
        else {
            return this.length();
        }
    },

    /**
	 * Calculates the squared length of a vector
	 *
	 * @returns {Number} squared length of vector
	 */
    squaredLength: function () {
        let x = this.x;
		let y = this.y;
		let z = this.z;
		return x * x + y * y + z * z;
    },

    /**
	 * Calculates the squared euclidian distance to vector
	 *
	 * @param {Vector3} v the vector operand
	 * @returns {Number} squared distance to vector v
	 */
    squaredDistance: function (v) {
        let x = v.x - this.x;
     	let y = v.y - this.y;
    	let z = v.z - this.z;
     	return x * x + y * y + z * z;
    },

    /**
	 * Negates the components of a vector
	 *
	 * @param {Vector3} v the vector operand
	 */
    negate: function (v = this) {
        this.x = -v.x;
		this.y = -v.y;
		this.z = -v.z;
        return this;
    },

    /**
	 * Computes the cross product of two vectors
	 *
	 * @param {Vector3} va the first vector operand
	 * @param {Vector3} vb the second vector operand
	 */
    cross: function (va, vb) {
        if (vb) {        
            this.x = va.y * vb.z - va.z * vb.y;
            this.y = va.z * vb.x - va.x * vb.z;
            this.z = va.x * vb.y - va.y * vb.x;
        }
        else {
            this.x = this.y * va.z - this.z * va.y;
            this.y = this.z * va.x - this.x * va.z;
            this.z = this.x * va.y - this.y * va.x;
        }    
        return this;
    },

    /**
	 * Scales a vector by a scalar number
	 *
	 * @param {Number} s the scale number
	 */
    scale: function (s) {
        this.x = this.x * s;
		this.y = this.y * s;
		this.z = this.z * s;
        return this;
    },

    /**
	 * Normalize a vector
	 */
    normalize: function () {
		let len = this.x * this.x + this.y * this.y + this.z * this.z;
		if (len > 0) {
			len = 1 / Math.sqrt(len);
		}
		this.x = this.x * len;
		this.y = this.y * len;
		this.z = this.z * len;
        return this;
    },

     /**
	 * Calculates the dot product with vector
	 *
	 * @param {Vector3} v the vector operand
	 * @returns {Number} dot product with vector v
	 */
    dot: function (v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    },

    /**
	 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
	 *
	 * @param {Vector3} v vector operand
	 * @returns {Boolean} True if the vectors are equal, false if not
	 */
    equals: function (v) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    },

    /**
	 * Transforms the vector with a matrix3
	 *
	 * @param {Matrix3} mat3 the matrix operand
	 */
	applyMatrix3: function (mat3) {
        let x = this.x;
        let y = this.y;
        let z = this.z;
		this.x = x * mat3.m00 + y * mat3.m10 + z * mat3.m20;
		this.y = x * mat3.m01 + y * mat3.m11 + z * mat3.m21;
		this.z = x * mat3.m02 + y * mat3.m12 + z * mat3.m22;
		return this;
    },

    /**
	 * Transforms the vector with a matrix4
	 * 4th vector component is implicitly '1'
	 *
	 * @param {Matrix4} mat4 the matrix operand
	 */
    applyMatrix4: function (mat4) {
        let x = this.x;
        let y = this.y;
        let z = this.z;
		let w = mat4.m03 * x + mat4.m13 * y + mat4.m23 * z + mat4.m33;
		w = w || 1.0;
		this.x = (mat4.m00 * x + mat4.m10 * y + mat4.m20 * z + mat4.m30) / w;
		this.y = (mat4.m01 * x + mat4.m11 * y + mat4.m21 * z + mat4.m31) / w;
		this.z = (mat4.m02 * x + mat4.m12 * y + mat4.m22 * z + mat4.m32) / w;
        return this;
    },

    /**
	 * Transforms the vector with a matrix4 wothout applying translation.
	 * Useful for rays.
	 *
	 * @param {Matrix4} mat4 the matrix operand
	 */
    scaleRotateMatrix4: function (mat4) {
        let x = this.x;
		let y = this.y;
        let z = this.z;
		let w = mat4.m03 * x + mat4.m13 * y + mat4.m23 * z + mat4.m33;
		w = w || 1.0;
		this.x = (mat4.m00 * x + mat4.m10 * y + mat4.m20 * z) / w;
		this.y = (mat4.m01 * x + mat4.m11 * y + mat4.m21 * z) / w;
		this.z = (mat4.m02 * x + mat4.m12 * y + mat4.m22 * z) / w;
        return this;
    },

    /**
	 * Transforms the vector with a matrix4
	 *
	 * @param {Matrix4} mat4 the matrix operand
	 */
    transformDirection: function (mat4) {
        let x = this.x;
        let y = this.y;
        let z = this.z;
        this.x = mat4.m00 * x + mat4.m10 * y + mat4.m20 * z;
        this.y = mat4.m01 * x + mat4.m11 * y + mat4.m21 * z;
        this.z = mat4.m02 * x + mat4.m12 * y + mat4.m22 * z;

        return this.normalize();
    },

    /**
	 * Transforms the vector with a quaternion
	 *
	 * @param {Quaternion} q quaternion to transform with
	 */
    applyQuaternion: function (q) {
        let x = this.x,
			y = this.y,
			z = this.z;
		let qx = q.x,
			qy = q.y,
			qz = q.z,
			qw = q.w;
	
		let uvx = qy * z - qz * y;
		let uvy = qz * x - qx * z;
		let uvz = qx * y - qy * x;
	
		let uuvx = qy * uvz - qz * uvy;
		let uuvy = qz * uvx - qx * uvz;
		let uuvz = qx * uvy - qy * uvx;
	
		let w2 = qw * 2;
		uvx *= w2;
		uvy *= w2;
		uvz *= w2;
	
		uuvx *= 2;
		uuvy *= 2;
		uuvz *= 2;
	
		this.x = x + uvx + uuvx;
		this.y = y + uvy + uuvy;
		this.z = z + uvz + uuvz;
        return this;
    },

    /**
	 * Get the angle with vector
	 * @param {Vector3} v vector operand
	 * @returns {Number} The angle in radians
	 */
    angle: function (v) {
        let tempA = new glw.Vector3(0, 0, 0);
		let tempB = new glw.Vector3(0, 0, 0);

        this.copy(tempA, this);
	    this.copy(tempB, v);
	
	    this.normalize(tempA, tempA);
	    this.normalize(tempB, tempB);
	
	    let cosine = this.dot(tempA, tempB);
	
	    if (cosine > 1.0) {
		    return 0;
	    } else if (cosine < -1.0) {
		    return Math.PI;
	    } else {
		    return Math.acos(cosine);
	    }
    },

    /**
	 * Performs a linear interpolation between two vectors
	 *
	 * @param {Vector3} v vector operand.
	 * @param {Number} t interpolation amount between the two inputs
	 */
    lerp: function (v, t) {
        this.x = this.x + t * (v.x - this.x);
		this.y = this.y + t * (v.y - this.y);
		this.z = this.z + t * (v.z - this.z);
        return this;
    },

    /**
	 * Clones the vector
	 *
	 * @returns {Vector3} cloned vector
	 */
    clone: function () {
        return new glw.Vector3(this.x, this.y, this.z);
    },

    /**
	 * Creates the vector from array
	 */
    fromArray: function (a, o = 0) {
        this.x = a[o];
        this.y = a[o + 1];
        this.z = a[o + 2];
        return this;
    },

    /**
	 * Creates the array from vector
	 *
	 * @returns {array} array with vector values
	 */
    toArray: function (a = [], o = 0) {
        a[o] = this.x;
        a[o + 1] = this.y;
        a[o + 2] = this.z;
        return a;
    }
};

glw.Vector4 = function ( x = 0, y = x, z = x, w = x ) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
};
glw.Vector4.prototype = {

	constructor: glw.Vector4,
    
    /**
	 * Set the components of a vector to the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 */
	set: function (x, y = x, z = x, w = x) {
        this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
        return this;
	},

    /**
	 * Copy the values from vector
	 *
	 * @param {Vector4} v the vector operand
	 */
    copy: function (v) {
        this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = v.w;
        return this;
	},
    
    /**
	 * Adds two vectors
	 *
	 * @param {Vector4} va the first vector operand
	 * @param {Vector4} vb the second vector operand
	 */
    add: function (va, vb) {
        if (vb) {
            this.x = va.x + vb.x;
            this.y = va.y + vb.y;
            this.z = va.z + vb.z;
            this.w = va.w + vb.w;
        }
        else {
            this.x = this.x + va.x;
            this.y = this.y + va.y;
            this.z = this.z + va.z;
            this.w = this.w + va.w;
        }        
        return this;
	},
	
	/**
	 * Subtracts first vector from second vector
	 *
	 * @param {Vector4} va the first vector operand
	 * @param {Vector4} vb the second vector operand
	 */
    sub: function (va, vb) {
        if (vb) {
            this.x = va.x - vb.x;
            this.y = va.y - vb.y;
            this.z = va.z - vb.z;
            this.w = va.w - vb.w;
        }
        else {
            this.x = this.x - va.x;
            this.y = this.y - va.y;
            this.w = this.w - va.w;
        }    
        return this;
    },

	/**
	 * Multiplies with vector
	 *
	 * @param {Vector4} v the vector operand
	 */
    multiply: function (v) {
        if (v instanceof glw.Vector4) {
            this.x = this.x * v.x;
            this.y = this.y * v.y;
			this.z = this.z * v.z;
			this.w = this.w * v.w;
        }
        else {
            return this.scale(v);
        }    
        return this;
	},
	
	/**
	 * Divides with vector
	 *
	 * @param {Vector4} v the vector operand
	 */
    divide: function (v) {
        if (v instanceof glw.Vector4) {
            this.x = this.x / v.x;
            this.y = this.y / v.y;
            this.z = this.z / v.z;
            this.w = this.w / v.w;
        }
        else{
            return this.scale(1 / v);
        }    
        return this;
	},
	
	/**
	 * Returns the inverse of the components of a vector
	 *
	 * @param {Vector4} v the vector operand
	 */
    inverse: function (v = this) {
        this.x = 1.0 / v.x;
		this.y = 1.0 / v.y;
        this.z = 1.0 / v.z;
        this.w = 1.0 / v.w;
        return this;
	},
	
    /**
	 * Calculates the length of a vector
     *
	 * @returns {Number} length of vector
	 */
	length: function () {
		let x = this.x;
		let y = this.y;
		let z = this.z;
		let w = this.w;
		return Math.sqrt(x * x + y * y + z * z + w * w);
	},
	
	/**
	 * Calculates the squared length of a vector
	 *
	 * @returns {Number} squared length of vector
	 */
    squaredLength: function () {
        let x = this.x;
		let y = this.y;
        let z = this.z;
        let w = this.w;
		return x * x + y * y + z * z + w * w;
	},
	
	/**
	 * Negates the components of a vector
	 *
	 * @param {Vector4} v the vector operand
	 */
    negate: function (v = this) {
        this.x = -v.x;
		this.y = -v.y;
        this.z = -v.z;
        this.w = -v.w;
        return this;
    },
    
    /**
	 * Scales a vector by a scalar number
	 *
	 * @param {Number} s the scale number
	 */
	scale: function (s) {
		this.x = this.x * s;
		this.y = this.y * s;
		this.z = this.z * s;
		this.w = this.w * s;
		return this;
	},

    /**
	 * Normalize a vector
	 */
    normalize: function () {
		let len = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
		if (len > 0) {
			len = 1 / Math.sqrt(len);
		}
		this.x = this.x * len;
		this.y = this.y * len;
		this.z = this.z * len;
		this.w = this.w * len;
        return this;
    },
    
    /**
	 * Calculates the dot product with vector
	 *
	 * @param {Vector4} v the vector operand
	 * @returns {Number} dot product with vector v
	 */
	dot: function (v) {
		return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
	},
    
    /**
	 * Performs a linear interpolation between two vectors
	 *
	 * @param {Vector4} v vector operand
	 * @param {Number} t interpolation amount between the two inputs
	 */
	lerp: function (v, t) {
		this.x = this.x + t * (v.x - this.x);
		this.y = this.y + t * (v.y - this.y);
		this.z = this.z + t * (v.z - this.z);
		this.w = this.w + t * (v.w - this.w);
		return this;
	},

    /**
	 * Creates the vector from array
	 */
	fromArray: function (a, o = 0) {
        this.x = a[o];
        this.y = a[o + 1];
        this.z = a[o + 2];
        this.w = a[o + 3];
        return this;
    },

    /**
	 * Creates the array from vector
	 *
	 * @returns {array} array with vector values
	 */
    toArray: function (a = [], o = 0) {
        a[o] = this.x;
        a[o + 1] = this.y;
        a[o + 2] = this.z;
        a[o + 3] = this.w;
        return a;
    }
};

glw.Matrix3 = function ( m00 = 1, m01 = 0, m02 = 0, m10 = 0, m11 = 1, m12 = 0, m20 = 0, m21 = 0, m22 = 1) {
	this.m00 = m00;
	this.m01 = m01; 
	this.m02 = m02; 
	this.m10 = m10; 
	this.m11 = m11; 
	this.m12 = m12; 
	this.m20 = m20; 
	this.m21 = m21; 
	this.m22 = m22;
};
glw.Matrix3.prototype = {

	constructor: glw.Matrix3,

    /**
	 * Set the components of a mat3 to the given values
	 */
	set: function (m00, m01, m02, m10, m11, m12, m20, m21, m22) {
        this.m00 = m00;
		this.m01 = m01;
		this.m02 = m02;
		this.m10 = m10;
		this.m11 = m11;
		this.m12 = m12;
		this.m20 = m20;
		this.m21 = m21;
		this.m22 = m22; 
        return this;
    },

    /**
	 * Copy the values from one matrix to another
	 *
	 * @param {Matrix3} m the source matrix
	 */
    copy: function (m) {
        this.m00 = m.m00;
		this.m01 = m.m01;
		this.m02 = m.m02;
		this.m10 = m.m10;
		this.m11 = m.m11;
		this.m12 = m.m12;
		this.m20 = m.m20;
		this.m21 = m.m21;
		this.m22 = m.m22;
        return this;
    },

    /**
	 * Adds two matrix
	 *
	 * @param {Matrix3} ma the first operand
	 * @param {Matrix3} mb the second operand
	 */
	add: function(ma, mb) {	
		if (mb) {
            this.m00 = ma.m00 + mb.m00;
			this.m01 = ma.m01 + mb.m01;
			this.m02 = ma.m02 + mb.m02;
			this.m10 = ma.m10 + mb.m10;
			this.m11 = ma.m11 + mb.m11;
			this.m12 = ma.m12 + mb.m12;
			this.m20 = ma.m20 + mb.m20;
			this.m21 = ma.m21 + mb.m21;
			this.m22 = ma.m22 + mb.m22;
        }
        else {
			this.m00 = this.m00 + ma.m00;
			this.m01 = this.m01 + ma.m01;
			this.m02 = this.m02 + ma.m02;
			this.m10 = this.m10 + ma.m10;
			this.m11 = this.m11 + ma.m11;
			this.m12 = this.m12 + ma.m12;
			this.m20 = this.m20 + ma.m20;
			this.m21 = this.m21 + ma.m21;
			this.m22 = this.m22 + ma.m22;
        }  
		return this;
    },
    
    /**
	 * Subtracts matrix b from matrix a
	 *
	 * @param {Matrix3} ma the first operand
	 * @param {Matrix3} mb the second operand
	 */
	sub: function(ma, mb) {
		if (mb) {
            this.m00 = ma.m00 - mb.m00;
			this.m01 = ma.m01 - mb.m01;
			this.m02 = ma.m02 - mb.m02;
			this.m10 = ma.m10 - mb.m10;
			this.m11 = ma.m11 - mb.m11;
			this.m12 = ma.m12 - mb.m12;
			this.m20 = ma.m20 - mb.m20;
			this.m21 = ma.m21 - mb.m21;
			this.m22 = ma.m22 - mb.m22;
        }
        else {
			this.m00 = this.m00 - ma.m00;
			this.m01 = this.m01 - ma.m01;
			this.m02 = this.m02 - ma.m02;
			this.m10 = this.m10 - ma.m10;
			this.m11 = this.m11 - ma.m11;
			this.m12 = this.m12 - ma.m12;
			this.m20 = this.m20 - ma.m20;
			this.m21 = this.m21 - ma.m21;
			this.m22 = this.m22 - ma.m22;
        }  	
		return this;
    },
    
    /**
	 * Multiplies two matrices
	 *
	 * @param {Matrix3} ma the first operand
	 * @param {Matrix3} mb the second operand
	 */
    multiply: function (ma, mb) {
        if(mb) {
            let a00 = ma.m00,
                a01 = ma.m01,
                a02 = ma.m02;
            let a10 = ma.m10,
                a11 = ma.m11,
                a12 = ma.m12;
            let a20 = ma.m20,
                a21 = ma.m21,
                a22 = ma.m22;

            let b00 = mb.m00,
                b01 = mb.m01,
                b02 = mb.m02;
            let b10 = mb.m10,
                b11 = mb.m11,
                b12 = mb.m12;
            let b20 = mb.m20,
                b21 = mb.m21,
                b22 = mb.m22;

            this.m00 = b00 * a00 + b01 * a10 + b02 * a20;
            this.m01 = b00 * a01 + b01 * a11 + b02 * a21;
            this.m02 = b00 * a02 + b01 * a12 + b02 * a22;

            this.m10 = b10 * a00 + b11 * a10 + b12 * a20;
            this.m11 = b10 * a01 + b11 * a11 + b12 * a21;
            this.m12 = b10 * a02 + b11 * a12 + b12 * a22;

            this.m20 = b20 * a00 + b21 * a10 + b22 * a20;
            this.m21 = b20 * a01 + b21 * a11 + b22 * a21;
            this.m22 = b20 * a02 + b21 * a12 + b22 * a22;
        }
        else {
            let a00 = this.m00,
                a01 = this.m01,
                a02 = this.m02;
            let a10 = this.m10,
                a11 = this.m11,
                a12 = this.m12;
            let a20 = this.m20,
                a21 = this.m21,
                a22 = this.m22;

            let b00 = ma.m00,
                b01 = ma.m01,
                b02 = ma.m02;
            let b10 = ma.m10,
                b11 = ma.m11,
                b12 = ma.m12;
            let b20 = ma.m20,
                b21 = ma.m21,
                b22 = ma.m22;

            this.m00 = b00 * a00 + b01 * a10 + b02 * a20;
            this.m01 = b00 * a01 + b01 * a11 + b02 * a21;
            this.m02 = b00 * a02 + b01 * a12 + b02 * a22;

            this.m10 = b10 * a00 + b11 * a10 + b12 * a20;
            this.m11 = b10 * a01 + b11 * a11 + b12 * a21;
            this.m12 = b10 * a02 + b11 * a12 + b12 * a22;

            this.m20 = b20 * a00 + b21 * a10 + b22 * a20;
            this.m21 = b20 * a01 + b21 * a11 + b22 * a21;
            this.m22 = b20 * a02 + b21 * a12 + b22 * a22;
        }

        return this;
    },

	/**
	 * Multiply each element of the matrix by a scalar.
	 *
	 * @param {Matrix3} ma the matrix to scale
	 * @param {Number} s amount to scale the matrix's elements by
	 */
	multiplyScalar: function(s) {
		this.m00 = this.m00 * s;
		this.m01 = this.m01 * s;
		this.m02 = this.m02 * s;
		this.m10 = this.m10 * s;
		this.m11 = this.m11 * s;
		this.m12 = this.m12 * s;
		this.m20 = this.m20 * s;
		this.m21 = this.m21 * s;
		this.m22 = this.m22 * s;
		return this;
	},

    /**
	 * Scales the mat3 by the dimensions in the given vector
	 *
	 * @param {Matrix3} m the matrix to rotate
	 * @param {Vector2} v the vector to scale the matrix by
	 **/
    scale: function (v, m = this) {
        let x = v.x,
			y = v.y;

        this.m00 = x * m.m00;
		this.m01 = x * m.m01;
		this.m02 = x * m.m02;

		this.m10 = y * m.m10;
		this.m11 = y * m.m11;
		this.m12 = y * m.m12;

		this.m20 = m.m20;
		this.m21 = m.m21;
		this.m22 = m.m22;

        return this;
    },

    /**
	 * Translate a matrix by the given vector
	 *
	 * @param {Matrix3} m the matrix to translate
	 * @param {Vector2} v vector to translate by
	 */
    translate: function (v, m = this) {
        let a00 = m.m00,
			a01 = m.m01,
			a02 = m.m02,
			a10 = m.m10,
			a11 = m.m11,
			a12 = m.m12,
			a20 = m.m20,
			a21 = m.m21,
			a22 = m.m22,
			x = v.x,
			y = v.y;

        this.m00 = a00;
        this.m01 = a01;
        this.m02 = a02;

        this.m10 = a10;
        this.m11 = a11;
        this.m12 = a12;

        this.m20 = x * a00 + y * a10 + a20;
        this.m21 = x * a01 + y * a11 + a21;
        this.m22 = x * a02 + y * a12 + a22;
    
        return this;
    },

    /**
	 * Rotates a matrix by the given angle
	 *
	 * @param {Matrix3} m the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 */
    rotate: function (rad, m = this) {
        let a00 = m.m00,
			a01 = m.m01,
			a02 = m.m02,
			a10 = m.m10,
			a11 = m.m11,
			a12 = m.m12,
			a20 = m.m20,
			a21 = m.m21,
			a22 = m.m22,
			s = Math.sin(rad),
			c = Math.cos(rad);

        this.m00 = c * a00 + s * a10;
        this.m01 = c * a01 + s * a11;
        this.m02 = c * a02 + s * a12;

        this.m10 = c * a10 - s * a00;
        this.m11 = c * a11 - s * a01;
        this.m12 = c * a12 - s * a02;

        this.m20 = a20;
        this.m21 = a21;
        this.m22 = a22;
        return this;
    },

    /**
	 * Set a matrix to the identity matrix
	 */
    identity: function () {
        this.m00 = 1;
		this.m01 = 0;
		this.m02 = 0;
		this.m10 = 0;
		this.m11 = 1;
		this.m12 = 0;
		this.m20 = 0;
		this.m21 = 0;
		this.m22 = 1;
        return this;
    },

    /**
	 * Copies the upper-left 3x3 values into the given matrix
	 *
	 * @param {Matrix4} m the source 4x4 matrix
	 */
    fromMatrix4: function (m) {
        this.m00 = m.m00;
		this.m01 = m.m01;
		this.m02 = m.m02;
		this.m10 = m.m10;
		this.m11 = m.m11;
		this.m12 = m.m12;
		this.m20 = m.m20;
		this.m21 = m.m21;
		this.m22 = m.m22;
        return this;
    },

    /**
	 * Calculates a 3x3 matrix from the given quaternion
	 *
	 * @param {Quaternion} q quaternion to create matrix from
	 */
    fromQuaternion: function (q) {
        let x = q.x,
			y = q.y,
			z = q.z,
			w = q.w;
		let x2 = x + x;
		let y2 = y + y;
		let z2 = z + z;

		let xx = x * x2;
		let yx = y * x2;
		let yy = y * y2;
		let zx = z * x2;
		let zy = z * y2;
		let zz = z * z2;
		let wx = w * x2;
		let wy = w * y2;
		let wz = w * z2;

		this.m00 = 1 - yy - zz;
		this.m10 = yx - wz;
		this.m20 = zx + wy;

		this.m01 = yx + wz;
		this.m11 = 1 - xx - zz;
		this.m21 = zy - wx;

		this.m02 = zx - wy;
		this.m12 = zy + wx;
		this.m22 = 1 - xx - yy;

        return this;
    },

    /**
	 * Calculates a 3x3 matrix from the given vectors
	 *
	 * @param {Vector3} vec3a first vector operand
     * @param {Vector3} vec3b second vector operand
     * @param {Vector3} vec3c third vector operand
	 */
    fromBasis: function (vec3a, vec3b, vec3c) {
        this.set(vec3a.x, vec3a.y, vec3a.z, vec3b.x, vec3b.y, vec3b.z, vec3c.x, vec3c.y, vec3c.z);
        return this;
    },

    /**
	 * Inverts a matrix
	 *
	 * @param {Matrix3} m the source matrix
	 */
    inverse: function (m = this) {
        let a00 = m.m00,
			a01 = m.m01,
			a02 = m.m02;
		let a10 = m.m10,
			a11 = m.m11,
			a12 = m.m12;
		let a20 = m.m20,
			a21 = m.m21,
			a22 = m.m22;

		let b01 = a22 * a11 - a12 * a21;
		let b11 = -a22 * a10 + a12 * a20;
		let b21 = a21 * a10 - a11 * a20;

		// Calculate the determinant
		let det = a00 * b01 + a01 * b11 + a02 * b21;

		if (!det) {
			return null;
		}
		det = 1.0 / det;

		this.m00 = b01 * det;
		this.m01 = (-a22 * a01 + a02 * a21) * det;
		this.m02 = (a12 * a01 - a02 * a11) * det;
		this.m10 = b11 * det;
		this.m11 = (a22 * a00 - a02 * a20) * det;
		this.m12 = (-a12 * a00 + a02 * a10) * det;
		this.m20 = b21 * det;
		this.m21 = (-a21 * a00 + a01 * a20) * det;
		this.m22 = (a11 * a00 - a01 * a10) * det;

        return this;
    },

    /**
	 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
	 *
	 * @param {Matrix4} m Matrix4 to derive the normal matrix from
	 */
    getNormalMatrix: function (m) {
        let a00 = m.m00,
			a01 = m.m01,
			a02 = m.m02,
			a03 = m.m03;
		let a10 = m.m10,
			a11 = m.m11,
			a12 = m.m12,
			a13 = m.m13;
		let a20 = m.m20,
			a21 = m.m21,
			a22 = m.m22,
			a23 = m.m23;
		let a30 = m.m30,
			a31 = m.m31,
			a32 = m.m32,
			a33 = m.m33;

		let b00 = a00 * a11 - a01 * a10;
		let b01 = a00 * a12 - a02 * a10;
		let b02 = a00 * a13 - a03 * a10;
		let b03 = a01 * a12 - a02 * a11;
		let b04 = a01 * a13 - a03 * a11;
		let b05 = a02 * a13 - a03 * a12;
		let b06 = a20 * a31 - a21 * a30;
		let b07 = a20 * a32 - a22 * a30;
		let b08 = a20 * a33 - a23 * a30;
		let b09 = a21 * a32 - a22 * a31;
		let b10 = a21 * a33 - a23 * a31;
		let b11 = a22 * a33 - a23 * a32;

		// Calculate the determinant
		let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

		if (!det) {
			return null;
		}
		det = 1.0 / det;

		this.m00 = (a11 * b11 - a12 * b10 + a13 * b09) * det;
		this.m01 = (a12 * b08 - a10 * b11 - a13 * b07) * det;
		this.m02 = (a10 * b10 - a11 * b08 + a13 * b06) * det;

		this.m10 = (a02 * b10 - a01 * b11 - a03 * b09) * det;
		this.m11 = (a00 * b11 - a02 * b08 + a03 * b07) * det;
		this.m12 = (a01 * b08 - a00 * b10 - a03 * b06) * det;

		this.m20 = (a31 * b05 - a32 * b04 + a33 * b03) * det;
		this.m21 = (a32 * b02 - a30 * b05 - a33 * b01) * det;
		this.m22 = (a30 * b04 - a31 * b02 + a33 * b00) * det;

        return this;
    },

    /**
	 * Transpose the values of a matrix
	 *
	 * @param {Matrix3} m the source matrix
	 */
	transpose: function(m) {
		// If we are transposing ourselves we can skip a few steps but have to cache some values
		if (out === a) {
			let a01 = m.m01,
				a02 = m.m02,
				a12 = m.m12;
            this.m01 = m.m10;
			this.m02 = m.m20;
			this.m10 = a01;
			this.m12 = m.m21;
			this.m20 = a02;
			this.m21 = a12;
		} else {
			this.m00 = m.m00;
			this.m01 = m.m10;
			this.m02 = m.m20;
			this.m10 = m.m01;
			this.m11 = m.m11;
			this.m12 = m.m21;
			this.m20 = m.m02;
			this.m21 = m.m12;
			this.m22 = m.m22;
		}

		return this;
    },
    
    /**
	 * Calculates the determinant of a matrix
	 *
	 * @param {Matrix3} m the source matrix
	 * @returns {Number} determinant of a
	 */
	determinant: function(m) {
		let a00 = m.m00,
			a01 = m.m01,
			a02 = m.m02;
		let a10 = m.m10,
			a11 = m.m11,
			a12 = m.m12;
		let a20 = m.m20,
			a21 = m.m21,
			a22 = m.m22;

		return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
    },
    
    /**
	 * Generates a 2D projection matrix with the given bounds
	 *
	 * @param {number} width Width of your gl context
	 * @param {number} height Height of gl context
	 */
	projection: function(width, height) {
		this.m00 = 2 / width;
		this.m01 = 0;
		this.m02 = 0;
		this.m10 = 0;
		this.m11 = -2 / height;
		this.m12 = 0;
		this.m20 = -1;
		this.m21 = 1;
		this.m22 = 1;
		return this;
	},
    
	/**
	 * Creates the matrix from array
	 */
	fromArray: function (a, o = 0) {
        this.m00 = a[o];
        this.m01 = a[o + 1];
        this.m02 = a[o + 2];
        this.m10 = a[o + 3];
        this.m11 = a[o + 4];
        this.m12 = a[o + 5];
        this.m20 = a[o + 6];
        this.m21 = a[o + 7];
        this.m22 = a[o + 8];
        return this;
    },

    /**
	 * Creates the array from matrix
	 *
	 * @returns {array} array with matrix values
	 */
	toArray: function (a = [], o = 0) {
        a[o] = this.m00;
        a[o + 1] = this.m01;
        a[o + 2] = this.m02;
		a[o + 3] = this.m10;
		a[o + 4] = this.m11;
		a[o + 5] = this.m12;
		a[o + 6] = this.m20;
		a[o + 7] = this.m21;
		a[o + 8] = this.m22;
        return a;
    }
};

glw.Matrix4 = function ( m00 = 1, m01 = 0, m02 = 0, m03 = 0, m10 = 0, m11 = 1, m12 = 0, m13 = 0, m20 = 0, m21 = 0, m22 = 1, m23 = 0, m30 = 0, m31 = 0, m32 = 0, m33 = 1) {
	this.m00 = m00;
	this.m01 = m01;
	this.m02 = m02;
	this.m03 = m03;
	this.m10 = m10;
	this.m11 = m11;
	this.m12 = m12;
	this.m13 = m13;
	this.m20 = m20;
	this.m21 = m21;
	this.m22 = m22;
	this.m23 = m23;
	this.m30 = m30;
	this.m31 = m31;
	this.m32 = m32;
	this.m33 = m33;
};
glw.Matrix4.prototype = {

	constructor: glw.Matrix4,
	
	get x() {
		return this.m30;
	},
	set x(value) {
		this.m30 = value;
	},

	get y() {
		return this.m31;
	},
	set y(value) {
		this.m31 = value;
	},

	get z() {
		return this.m32;
	},
	set z(value) {
		this.m32 = value;
	},

	get z() {
		return this.m33;
	},
	set z(value) {
		this.m33 = value;
	},

    /**
	 * Set the components of a mat4 to the given values
	 */
	set: function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
        this.m00 = m00;
		this.m01 = m01;
		this.m02 = m02;
		this.m03 = m03;
		this.m10 = m10;
		this.m11 = m11;
		this.m12 = m12;
		this.m13 = m13;
		this.m20 = m20;
		this.m21 = m21;
		this.m22 = m22;
		this.m23 = m23;
		this.m30 = m30;
		this.m31 = m31;
		this.m32 = m32;
		this.m33 = m33;
        return this;
    },

    /**
	 * Copy the values from one mat4 to another
	 *
	 * @param {Matrix4} m the source matrix
	 */
    copy: function (m) {
        this.m00 = m.m00;
		this.m01 = m.m01;
		this.m02 = m.m02;
		this.m03 = m.m03;
		this.m10 = m.m10;
		this.m11 = m.m11;
		this.m12 = m.m12;
		this.m13 = m.m13;
		this.m20 = m.m20;
		this.m21 = m.m21;
		this.m22 = m.m22;
		this.m23 = m.m23;
		this.m30 = m.m30;
		this.m31 = m.m31;
		this.m32 = m.m32;
		this.m33 = m.m33;
        return this;
    },

    /**
	 * Adds two matrix
	 *
	 * @param {Matrix4} ma the first operand
	 * @param {Matrix4} mb the second operand
	 */
	add: function (ma, mb) {
		this.m00 = ma.m00 + mb.m00;
		this.m01 = ma.m01 + mb.m01;
		this.m02 = ma.m02 + mb.m02;
		this.m03 = ma.m03 + mb.m03;
		this.m10 = ma.m10 + mb.m10;
		this.m11 = ma.m11 + mb.m11;
		this.m12 = ma.m12 + mb.m12;
		this.m13 = ma.m13 + mb.m13;
		this.m20 = ma.m20 + mb.m20;
		this.m21 = ma.m21 + mb.m21;
		this.m22 = ma.m22 + mb.m22;
		this.m23 = ma.m23 + mb.m23;
		this.m30 = ma.m30 + mb.m30;
		this.m31 = ma.m31 + mb.m31;
		this.m32 = ma.m32 + mb.m32;
		this.m33 = ma.m33 + mb.m33;
		return this;
    },

    /**
	 * Subtracts matrix b from matrix a
	 *
	 * @param {Matrix4} ma the first operand
	 * @param {Matrix4} mb the second operand
	 */
	sub: function (ma, mb) {
		this.m00 = ma.m00 - mb.m00;
		this.m01 = ma.m01 - mb.m01;
		this.m02 = ma.m02 - mb.m02;
		this.m03 = ma.m03 - mb.m03;
		this.m10 = ma.m10 - mb.m10;
		this.m11 = ma.m11 - mb.m11;
		this.m12 = ma.m12 - mb.m12;
		this.m13 = ma.m13 - mb.m13;
		this.m20 = ma.m20 - mb.m20;
		this.m21 = ma.m21 - mb.m21;
		this.m22 = ma.m22 - mb.m22;
		this.m23 = ma.m23 - mb.m23;
		this.m30 = ma.m30 - mb.m30;
		this.m31 = ma.m31 - mb.m31;
		this.m32 = ma.m32 - mb.m32;
		this.m33 = ma.m33 - mb.m33;
		return this;
    },

    /**
	 * Multiplies two matrices
	 *
	 * @param {Matrix4} ma the first operand
	 * @param {Matrix4} mb the second operand
	 */
    multiply: function (ma, mb) {
        if (mb) {
            let a00 = ma.m00,
                a01 = ma.m01,
                a02 = ma.m02,
                a03 = ma.m03;
            let a10 = ma.m10,
                a11 = ma.m11,
                a12 = ma.m12,
                a13 = ma.m13;
            let a20 = ma.m20,
                a21 = ma.m21,
                a22 = ma.m22,
                a23 = ma.m23;
            let a30 = ma.m30,
                a31 = ma.m31,
                a32 = ma.m32,
                a33 = ma.m33;

            // Cache only the current line of the second matrix
            let b0 = mb.m00,
                b1 = mb.m01,
                b2 = mb.m02,
                b3 = mb.m03;
            this.m00 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this.m01 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this.m02 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this.m03 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = mb.m10;
            b1 = mb.m11;
            b2 = mb.m12;
            b3 = mb.m13;
            this.m10 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this.m11 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this.m12 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this.m13 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = mb.m20;
            b1 = mb.m21;
            b2 = mb.m22;
            b3 = mb.m23;
            this.m20 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this.m21 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this.m22 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this.m23 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = mb.m30;
            b1 = mb.m31;
            b2 = mb.m32;
            b3 = mb.m33;
            this.m30 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this.m31 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this.m32 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this.m33 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        }
        else {
            let a00 = this.m00,
                a01 = this.m01,
                a02 = this.m02,
                a03 = this.m03;
            let a10 = this.m10,
                a11 = this.m11,
                a12 = this.m12,
                a13 = this.m13;
            let a20 = this.m20,
                a21 = this.m21,
                a22 = this.m22,
                a23 = this.m23;
            let a30 = this.m30,
                a31 = this.m31,
                a32 = this.m32,
                a33 = this.m33;

            // Cache only the current line of the second matrix
            let b0 = ma.m00,
                b1 = ma.m01,
                b2 = ma.m02,
                b3 = ma.m03;
            this.m00 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this.m01 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this.m02 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this.m03 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = ma.m10;
            b1 = ma.m11;
            b2 = ma.m12;
            b3 = ma.m13;
            this.m10 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this.m11 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this.m12 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this.m13 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = ma.m20;
            b1 = ma.m21;
            b2 = ma.m22;
            b3 = ma.m23;
            this.m20 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this.m21 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this.m22 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this.m23 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = ma.m30;
            b1 = ma.m31;
            b2 = ma.m32;
            b3 = ma.m33;
            this.m30 = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            this.m31 = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            this.m32 = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            this.m33 = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        }

        return this;
    },

    /**
	 * Multiply each element of the matrix by a scalar.
	 *
	 * @param {Matrix4} ma the matrix to scale
	 * @param {Number} s amount to scale the matrix's elements by
	 */
	multiplyScalar: function (s) {
		this.m00 = this.m00 * s;
		this.m01 = this.m01 * s;
		this.m02 = this.m02 * s;
		this.m03 = this.m03 * s;
		this.m10 = this.m10 * s;
		this.m11 = this.m11 * s;
		this.m12 = this.m12 * s;
		this.m13 = this.m13 * s;
		this.m20 = this.m20 * s;
		this.m21 = this.m21 * s;
		this.m22 = this.m22 * s;
		this.m23 = this.m23 * s;
		this.m30 = this.m30 * s;
		this.m31 = this.m31 * s;
		this.m32 = this.m32 * s;
		this.m33 = this.m33 * s;
		return this;
    },

    /**
	 * Scales the matrix by the dimensions in the given vector not using vectorization
	 *
	 * @param {Matrix4} m the matrix to scale
	 * @param {Vector3} v the vec3 to scale the matrix by
	 **/
    scale: function (v, m = this) {
        v = typeof v === 'number' ? {x: v, y: v, z: v} : v;

        let x = v.x,
            y = v.y,
            z = v.z;

        this.m00 = m.m00 * x;
        this.m01 = m.m01 * x;
        this.m02 = m.m02 * x;
        this.m03 = m.m03 * x;
        this.m10 = m.m10 * y;
        this.m11 = m.m11 * y;
        this.m12 = m.m12 * y;
        this.m13 = m.m13 * y;
        this.m20 = m.m20 * z;
        this.m21 = m.m21 * z;
        this.m22 = m.m22 * z;
        this.m23 = m.m23 * z;
        this.m30 = m.m30;
        this.m31 = m.m31;
        this.m32 = m.m32;
        this.m33 = m.m33;

        return this;
    },

    /**
	 * Translate a mat4 by the given vector
	 *
	 * @param {Matrix4} m the matrix to translate
	 * @param {Vector3} v vector to translate by
	 */
    translate: function (v, m = this) {
        let x = v.x,
			y = v.y,
			z = v.z;
		let a00, a01, a02, a03;
		let a10, a11, a12, a13;
		let a20, a21, a22, a23;

		if (m === this) {
			this.m30 = m.m00 * x + m.m10 * y + m.m20 * z + m.m30;
			this.m31 = m.m01 * x + m.m11 * y + m.m21 * z + m.m31;
			this.m32 = m.m02 * x + m.m12 * y + m.m22 * z + m.m32;
			this.m33 = m.m03 * x + m.m13 * y + m.m23 * z + m.m33;
		} else {
			a00 = m.m00;
			a01 = m.m01;
			a02 = m.m02;
			a03 = m.m03;
			a10 = m.m10;
			a11 = m.m11;
			a12 = m.m12;
			a13 = m.m13;
			a20 = m.m20;
			a21 = m.m21;
			a22 = m.m22;
			a23 = m.m23;

			this.m00 = a00;
			this.m01 = a01;
			this.m02 = a02;
			this.m03 = a03;
			this.m10 = a10;
			this.m11 = a11;
			this.m12 = a12;
			this.m13 = a13;
			this.m20 = a20;
			this.m21 = a21;
			this.m22 = a22;
			this.m23 = a23;

			this.m30 = a00 * x + a10 * y + a20 * z + a.m30;
			this.m31 = a01 * x + a11 * y + a21 * z + a.m31;
			this.m32 = a02 * x + a12 * y + a22 * z + a.m32;
			this.m33 = a03 * x + a13 * y + a23 * z + a.m33;
		}

        return this;
    },

    /**
	 * Rotates a mat4 by the given angle around the given axis
	 *
	 * @param {Matrix4} m the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {Vector3} axis the axis to rotate around
	 */
    rotate: function (rad, axis, m = this) {
        let x = axis.x,
			y = axis.y,
			z = axis.z;
		let len = Math.hypot(x, y, z);
		let s, c, t;
		let a00, a01, a02, a03;
		let a10, a11, a12, a13;
		let a20, a21, a22, a23;
		let b00, b01, b02;
		let b10, b11, b12;
		let b20, b21, b22;

		if (Math.abs(len) < 0.000001) {
			return null;
		}

		len = 1 / len;
		x *= len;
		y *= len;
		z *= len;

		s = Math.sin(rad);
		c = Math.cos(rad);
		t = 1 - c;

		a00 = m.m00;
		a01 = m.m01;
		a02 = m.m02;
		a03 = m.m03;
		a10 = m.m10;
		a11 = m.m11;
		a12 = m.m12;
		a13 = m.m13;
		a20 = m.m20;
		a21 = m.m21;
		a22 = m.m22;
		a23 = m.m23;

		// Construct the elements of the rotation matrix
		b00 = x * x * t + c;
		b01 = y * x * t + z * s;
		b02 = z * x * t - y * s;
		b10 = x * y * t - z * s;
		b11 = y * y * t + c;
		b12 = z * y * t + x * s;
		b20 = x * z * t + y * s;
		b21 = y * z * t - x * s;
		b22 = z * z * t + c;

		// Perform rotation-specific matrix multiplication
		this.m00 = a00 * b00 + a10 * b01 + a20 * b02;
		this.m01 = a01 * b00 + a11 * b01 + a21 * b02;
		this.m02 = a02 * b00 + a12 * b01 + a22 * b02;
		this.m03 = a03 * b00 + a13 * b01 + a23 * b02;
		this.m10 = a00 * b10 + a10 * b11 + a20 * b12;
		this.m11 = a01 * b10 + a11 * b11 + a21 * b12;
		this.m12 = a02 * b10 + a12 * b11 + a22 * b12;
		this.m13 = a03 * b10 + a13 * b11 + a23 * b12;
		this.m20 = a00 * b20 + a10 * b21 + a20 * b22;
		this.m21 = a01 * b20 + a11 * b21 + a21 * b22;
		this.m22 = a02 * b20 + a12 * b21 + a22 * b22;
		this.m23 = a03 * b20 + a13 * b21 + a23 * b22;

		if (a !== this) {
			// If the source and destination differ, copy the unchanged last row
			this.m30 = m.m30;
			this.m31 = m.m31;
			this.m32 = m.m32;
			this.m33 = m.m33;
		}

        return this;
    },

    /**
	 * Set a matrix to the identity matrix
	 */
    identity: function () {
        this.m00 = 1;
		this.m01 = 0;
		this.m02 = 0;
		this.m03 = 0;
		this.m10 = 0;
		this.m11 = 1;
		this.m12 = 0;
		this.m13 = 0;
		this.m20 = 0;
		this.m21 = 0;
		this.m22 = 1;
		this.m23 = 0;
		this.m30 = 0;
		this.m31 = 0;
		this.m32 = 0;
		this.m33 = 1;
        return this;
    },

    /**
	 * Generates a perspective projection matrix with the given bounds
	 *
	 * @param {number} fov Vertical field of view in radians
	 * @param {number} aspect Aspect ratio. typically viewport width/height
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 */
    fromPerspective: function ({ fov, aspect, near, far } = {}) {
        let f = 1.0 / Math.tan(fov / 2);
		let nf = 1 / (near - far);
		this.m00 = f / aspect;
		this.m01 = 0;
		this.m02 = 0;
		this.m03 = 0;
		this.m10 = 0;
		this.m11 = f;
		this.m12 = 0;
		this.m13 = 0;
		this.m20 = 0;
		this.m21 = 0;
		this.m22 = (far + near) * nf;
		this.m23 = -1;
		this.m30 = 0;
		this.m31 = 0;
		this.m32 = 2 * far * near * nf;
		this.m33 = 0;
        return this;
    },

    /**
	 * Generates a orthogonal projection matrix with the given bounds
	 *
	 * @param {number} left Left bound of the frustum
	 * @param {number} right Right bound of the frustum
	 * @param {number} bottom Bottom bound of the frustum
	 * @param {number} top Top bound of the frustum
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 */
    fromOrthogonal: function ({ left, right, bottom, top, near, far }) {
        let lr = 1 / (left - right);
		let bt = 1 / (bottom - top);
		let nf = 1 / (near - far);
		this.m00 = -2 * lr;
		this.m01 = 0;
		this.m02 = 0;
		this.m03 = 0;
		this.m10 = 0;
		this.m11 = -2 * bt;
		this.m12 = 0;
		this.m13 = 0;
		this.m20 = 0;
		this.m21 = 0;
		this.m22 = 2 * nf;
		this.m23 = 0;
		this.m30 = (left + right) * lr;
		this.m31 = (top + bottom) * bt;
		this.m32 = (far + near) * nf;
		this.m33 = 1;
        return this;
    },

    /**
	 * Calculates a 4x4 matrix from the given quaternion
	 *
	 * @param {Quaternion} q quaternion to create matrix from
	 */
    fromQuaternion: function (q) {
        let x = q.x,
			y = q.y,
			z = q.z,
			w = q.w;
		let x2 = x + x;
		let y2 = y + y;
		let z2 = z + z;

		let xx = x * x2;
		let yx = y * x2;
		let yy = y * y2;
		let zx = z * x2;
		let zy = z * y2;
		let zz = z * z2;
		let wx = w * x2;
		let wy = w * y2;
		let wz = w * z2;

		this.m00 = 1 - yy - zz;
		this.m01 = yx + wz;
		this.m02 = zx - wy;
		this.m03 = 0;

		this.m10 = yx - wz;
		this.m11 = 1 - xx - zz;
		this.m12 = zy + wx;
		this.m13 = 0;

		this.m20 = zx + wy;
		this.m21 = zy - wx;
		this.m22 = 1 - xx - yy;
		this.m23 = 0;

		this.m30 = 0;
		this.m31 = 0;
		this.m32 = 0;
		this.m33 = 1;
    
        return this;
    },

    setPosition: function (v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    },

    /**
	 * Inverts a matrix
	 *
	 * @param {Matrix4} m the source matrix
	 */
    inverse: function (m = this) {
        let a00 = m.m00,
			a01 = m.m01,
			a02 = m.m02,
			a03 = m.m03;
		let a10 = m.m10,
			a11 = m.m11,
			a12 = m.m12,
			a13 = m.m13;
		let a20 = m.m20,
			a21 = m.m21,
			a22 = m.m22,
			a23 = m.m23;
		let a30 = m.m30,
			a31 = m.m31,
			a32 = m.m32,
			a33 = m.m33;

		let b00 = a00 * a11 - a01 * a10;
		let b01 = a00 * a12 - a02 * a10;
		let b02 = a00 * a13 - a03 * a10;
		let b03 = a01 * a12 - a02 * a11;
		let b04 = a01 * a13 - a03 * a11;
		let b05 = a02 * a13 - a03 * a12;
		let b06 = a20 * a31 - a21 * a30;
		let b07 = a20 * a32 - a22 * a30;
		let b08 = a20 * a33 - a23 * a30;
		let b09 = a21 * a32 - a22 * a31;
		let b10 = a21 * a33 - a23 * a31;
		let b11 = a22 * a33 - a23 * a32;

		// Calculate the determinant
		let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

		if (!det) {
			return null;
		}
		det = 1.0 / det;

		this.m00 = (a11 * b11 - a12 * b10 + a13 * b09) * det;
		this.m01 = (a02 * b10 - a01 * b11 - a03 * b09) * det;
		this.m02 = (a31 * b05 - a32 * b04 + a33 * b03) * det;
		this.m03 = (a22 * b04 - a21 * b05 - a23 * b03) * det;
		this.m10 = (a12 * b08 - a10 * b11 - a13 * b07) * det;
		this.m11 = (a00 * b11 - a02 * b08 + a03 * b07) * det;
		this.m12 = (a32 * b02 - a30 * b05 - a33 * b01) * det;
		this.m13 = (a20 * b05 - a22 * b02 + a23 * b01) * det;
		this.m20 = (a10 * b10 - a11 * b08 + a13 * b06) * det;
		this.m21 = (a01 * b08 - a00 * b10 - a03 * b06) * det;
		this.m22 = (a30 * b04 - a31 * b02 + a33 * b00) * det;
		this.m23 = (a21 * b02 - a20 * b04 - a23 * b00) * det;
		this.m30 = (a11 * b07 - a10 * b09 - a12 * b06) * det;
		this.m31 = (a00 * b09 - a01 * b07 + a02 * b06) * det;
		this.m32 = (a31 * b01 - a30 * b03 - a32 * b00) * det;
		this.m33 = (a20 * b03 - a21 * b01 + a22 * b00) * det;

        return this;
    },

    /**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest);
	 *     mat4.translate(dest, vec);
	 *     let quatMat = mat4.create();
	 *     quat4.toMat4(quat, quatMat);
	 *     mat4.multiply(dest, quatMat);
	 *     mat4.scale(dest, scale)
	 *
	 * @param {Quaternion} q Rotation quaternion
	 * @param {Vector3} t Translation vector
	 * @param {Vector3} s Scaling vector
	 */
    compose: function (q, t, s) {
        let x = q.x,
			y = q.y,
			z = q.z,
			w = q.w;
		let x2 = x + x;
		let y2 = y + y;
		let z2 = z + z;

		let xx = x * x2;
		let xy = x * y2;
		let xz = x * z2;
		let yy = y * y2;
		let yz = y * z2;
		let zz = z * z2;
		let wx = w * x2;
		let wy = w * y2;
		let wz = w * z2;
		let sx = s.x;
		let sy = s.y;
		let sz = s.z;

		this.m00 = (1 - (yy + zz)) * sx;
		this.m01 = (xy + wz) * sx;
		this.m02 = (xz - wy) * sx;
		this.m03 = 0;
		this.m10 = (xy - wz) * sy;
		this.m11 = (1 - (xx + zz)) * sy;
		this.m12 = (yz + wx) * sy;
		this.m13 = 0;
		this.m20 = (xz + wy) * sz;
		this.m21 = (yz - wx) * sz;
		this.m22 = (1 - (xx + yy)) * sz;
		this.m23 = 0;
		this.m30 = t.x;
		this.m31 = t.y;
		this.m32 = t.z;
		this.m33 = 1;
    
        return this;
    },

    /**
	 * Returns a quaternion representing the rotational component
	 *  of a transformation matrix. If a matrix is built with
	 *  fromRotationTranslation, the returned quaternion will be the
	 *  same as the quaternion originally supplied.
     * @param {Quaternion} q quaternion to receive the rotation component
     * @return {Quaternion} rotation component
	 */
    getRotation: function (q) {

		const temp = new glw.Vector3(0, 0, 0);

        let scale = temp;
        
        this.getScaling(scale);
        
        let is1 = 1 / scale.x;
        let is2 = 1 / scale.y;
        let is3 = 1 / scale.z;

        let sm11 = this.m00 * is1;
        let sm12 = this.m01 * is2;
        let sm13 = this.m02 * is3;
        let sm21 = this.m10 * is1;
        let sm22 = this.m11 * is2;
        let sm23 = this.m12 * is3;
        let sm31 = this.m20 * is1;
        let sm32 = this.m21 * is2;
        let sm33 = this.m22 * is3;

        let trace = sm11 + sm22 + sm33;
        let S = 0;

        if (trace > 0) {
            S = Math.sqrt(trace + 1.0) * 2;
            q.w = 0.25 * S;
            q.x = (sm23 - sm32) / S;
            q.y = (sm31 - sm13) / S;
            q.z = (sm12 - sm21) / S;
        } else if (sm11 > sm22 && sm11 > sm33) {
            S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
            q.w = (sm23 - sm32) / S;
            q.x = 0.25 * S;
            q.y = (sm12 + sm21) / S;
            q.z = (sm31 + sm13) / S;
        } else if (sm22 > sm33) {
            S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
            q.w = (sm31 - sm13) / S;
            q.x = (sm12 + sm21) / S;
            q.y = 0.25 * S;
            q.z = (sm23 + sm32) / S;
        } else {
            S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
            q.w = (sm12 - sm21) / S;
            q.x = (sm31 + sm13) / S;
            q.y = (sm23 + sm32) / S;
            q.z = 0.25 * S;
        }

        return q;
    },

    /**
	 * Returns the translation vector component of a transformation
	 *  matrix. If a matrix is built with fromRotationTranslation,
	 *  the returned vector will be the same as the translation vector
	 *  originally supplied.
	 * @param  {Vector3} pos Vector to receive translation component
	 * @return {Vector3} translation component
	 */
    getTranslation: function (pos) {
        pos.x = this.m30;
		pos.y = this.m31;
		pos.z = this.m32;
        return pos;
    },

    /**
	 * Returns the scaling factor component of a transformation
	 *  matrix. If a matrix is built with fromRotationTranslationScale
	 *  with a normalized Quaternion paramter, the returned vector will be
	 *  the same as the scaling vector
	 *  originally supplied.
	 * @param  {Vector3} scale Vector to receive scaling factor component
	 * @return {Vector3} scaling factor component
	 */
    getScaling: function (scale) {
        let m11 = this.m00;
		let m12 = this.m01;
		let m13 = this.m02;
		let m21 = this.m10;
		let m22 = this.m11;
		let m23 = this.m12;
		let m31 = this.m20;
		let m32 = this.m21;
		let m33 = this.m22;

		scale.x = Math.hypot(m11, m12, m13);
		scale.y = Math.hypot(m21, m22, m23);
		scale.z = Math.hypot(m31, m32, m33);

		return scale;
    },

    getMaxScaleOnAxis: function () {
        let m11 = this.m00;
        let m12 = this.m01;
        let m13 = this.m02;
        let m21 = this.m10;
        let m22 = this.m11;
        let m23 = this.m12;
        let m31 = this.m20;
        let m32 = this.m21;
        let m33 = this.m22;

        const x = m11 * m11 + m12 * m12 + m13 * m13;
        const y = m21 * m21 + m22 * m22 + m23 * m23;
        const z = m31 * m31 + m32 * m32 + m33 * m33;

        return Math.sqrt(Math.max(x, y, z));
    },

    /**
	 * Generates a matrix that makes something look at something else.
	 *
	 * @param {Vector3} eye Position of the viewer
	 * @param {Vector3} target Point the viewer is looking at
	 * @param {Vector3} up vec3 pointing up
	 */
    lookAt: function (eye, target, up) {
        let eyex = eye.x,
			eyey = eye.y,
			eyez = eye.z,
			upx = up.x,
			upy = up.y,
			upz = up.z;

		let z0 = eyex - target.x,
			z1 = eyey - target.y,
			z2 = eyez - target.z;

		let len = z0 * z0 + z1 * z1 + z2 * z2;
		if (len === 0) {
			// eye and target are in the same position
			z2 = 1;
		} else {
			len = 1 / Math.sqrt(len);
			z0 *= len;
			z1 *= len;
			z2 *= len;
		}

		let x0 = upy * z2 - upz * z1,
			x1 = upz * z0 - upx * z2,
			x2 = upx * z1 - upy * z0;

		len = x0 * x0 + x1 * x1 + x2 * x2;
		if (len === 0) {
			// up and z are parallel
			if (upz) {
				upx += 1e-6;
			} else if (upy) {
				upz += 1e-6;
			} else {
				upy += 1e-6;
			}
			(x0 = upy * z2 - upz * z1), (x1 = upz * z0 - upx * z2), (x2 = upx * z1 - upy * z0);

			len = x0 * x0 + x1 * x1 + x2 * x2;
		}

		len = 1 / Math.sqrt(len);
		x0 *= len;
		x1 *= len;
		x2 *= len;

		this.m00 = x0;
		this.m01 = x1;
		this.m02 = x2;
		this.m03 = 0;
		this.m10 = z1 * x2 - z2 * x1;
		this.m11 = z2 * x0 - z0 * x2;
		this.m12 = z0 * x1 - z1 * x0;
		this.m13 = 0;
		this.m20 = z0;
		this.m21 = z1;
		this.m22 = z2;
		this.m23 = 0;
		this.m30 = eyex;
		this.m31 = eyey;
		this.m32 = eyez;
		this.m33 = 1;

        return this;
    },

    /**
	 * Transpose the values of a matrix
	 *
	 * @param {Matrix4} m the source matrix
	 */
	transpose: function (m) {
		// If we are transposing ourselves we can skip a few steps but have to cache some values
		if (this === m) {
			let a01 = m.m01,
				a02 = m.m02,
				a03 = m.m03;
			let a12 = m.m12,
				a13 = m.m13;
			let a23 = m.m23;

			this.m01 = m.m10;
			this.m02 = m.m20;
			this.m03 = m.m30;
			this.m10 = a01;
			this.m12 = m.m21;
			this.m13 = m.m31;
			this.m20 = a02;
			this.m21 = a12;
			this.m23 = m.m32;
			this.m30 = a03;
			this.m31 = a13;
			this.m32 = a23;
		} else {
			this.m00 = m.m00;
			this.m01 = m.m10;
			this.m02 = m.m20;
			this.m03 = m.m30;
			this.m10 = m.m01;
			this.m11 = m.m11;
			this.m12 = m.m21;
			this.m13 = m.m31;
			this.m20 = m.m02;
			this.m21 = m.m12;
			this.m22 = m.m22;
			this.m23 = m.m32;
			this.m30 = m.m03;
			this.m31 = m.m13;
			this.m32 = m.m23;
			this.m33 = m.m33;
		}

		return this;
	},

    /**
	 * Calculates the determinant of a matrix
	 * @returns {Number} determinant of a
	 */
    determinant: function () {
        let a00 = this.m00,
			a01 = this.m01,
			a02 = this.m02,
			a03 = this.m03;
		let a10 = this.m10,
			a11 = this.m11,
			a12 = this.m12,
			a13 = this.m13;
		let a20 = this.m20,
			a21 = this.m21,
			a22 = this.m22,
			a23 = this.m23;
		let a30 = this.m30,
			a31 = this.m31,
			a32 = this.m32,
			a33 = this.m33;

		let b00 = a00 * a11 - a01 * a10;
		let b01 = a00 * a12 - a02 * a10;
		let b02 = a00 * a13 - a03 * a10;
		let b03 = a01 * a12 - a02 * a11;
		let b04 = a01 * a13 - a03 * a11;
		let b05 = a02 * a13 - a03 * a12;
		let b06 = a20 * a31 - a21 * a30;
		let b07 = a20 * a32 - a22 * a30;
		let b08 = a20 * a33 - a23 * a30;
		let b09 = a21 * a32 - a22 * a31;
		let b10 = a21 * a33 - a23 * a31;
		let b11 = a22 * a33 - a23 * a32;

		// Calculate the determinant
		return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    },

    /**
	 * Creates the matrix from array
	 */
    fromArray: function (a, o = 0) {
        this.m00 = a[o];
        this.m01 = a[o + 1];
        this.m02 = a[o + 2];
        this.m03 = a[o + 3];
        this.m10 = a[o + 4];
        this.m11 = a[o + 5];
        this.m12 = a[o + 6];
        this.m13 = a[o + 7];
        this.m20 = a[o + 8];
        this.m21 = a[o + 9];
        this.m22 = a[o + 10];
        this.m23 = a[o + 11];
        this.m30 = a[o + 12];
        this.m31 = a[o + 13];
        this.m32 = a[o + 14];
        this.m33 = a[o + 15];
        return this;
    },

    /**
	 * Creates the array from matrix
	 *
	 * @returns {array} array with matrix values
	 */
    toArray: function (a = [], o = 0) {
        a[o] = this.m00;
        a[o + 1] = this.m01;
        a[o + 2] = this.m02;
        a[o + 3] = this.m03;
        a[o + 4] = this.m10;
        a[o + 5] = this.m11;
        a[o + 6] = this.m12;
        a[o + 7] = this.m13;
        a[o + 8] = this.m20;
        a[o + 9] = this.m21;
        a[o + 10] = this.m22;
        a[o + 11] = this.m23;
        a[o + 12] = this.m30;
        a[o + 13] = this.m31;
        a[o + 14] = this.m32;
        a[o + 15] = this.m33;
        return a;
    },
};

glw.Euler = function ( x = 0, y = x, z = x, order = 'YXZ') {
	this.order = order;
	this.onChange = () => {};

	let x_ = x;
	let y_ = y;
	let z_ = z;

	Object.defineProperties(this, {
		x: {
			get: function () {
				return x_;
			},
			set: function(value) {
				x_ = value;
				this.onChange();
			},
		},
		y: {
			get: function () {
				return y_;
			},
			set: function(value) {
				y_ = value;
				this.onChange();
			},
		},
		z: {
			get: function () {
				return z_;
			},
			set: function(value) {
				z_ = value;
				this.onChange();
			},
		},
	});
};
glw.Euler.prototype = {

	constructor: glw.Euler,

	set(x, y = x, z = x) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.onChange();
        return this;
	},

    copy: function (v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.onChange();
        return this;
	},

    reorder: function (order) {
        this.order = order;
        this.onChange();
        return this;
    },

    fromRotationMatrix: function (matrix, order = this.order) {
		let evt = this.onChange;
	
		this.onChange = () => {};
	
		let m = matrix.toArray();
		if (order === 'XYZ') {
			this.y = Math.asin(Math.min(Math.max(m[8], -1), 1));
			if (Math.abs(m[8]) < 0.99999) {
				this.x = Math.atan2(-m[9], m[10]);
				this.z = Math.atan2(-m[4], m[0]);
			} else {
				this.x = Math.atan2(m[6], m[5]);
				this.z = 0;
			}
		} else if (order === 'YXZ') {
			this.x = Math.asin(-Math.min(Math.max(m[9], -1), 1));
			if (Math.abs(m[9]) < 0.99999) {
				this.y = Math.atan2(m[8], m[10]);
				this.z = Math.atan2(m[1], m[5]);
			} else {
				this.y = Math.atan2(-m[2], m[0]);
				this.z = 0;
			}
		} else if (order === 'ZXY') {
			this.x = Math.asin(Math.min(Math.max(m[6], -1), 1));
			if (Math.abs(m[6]) < 0.99999) {
				this.y = Math.atan2(-m[2], m[10]);
				this.z = Math.atan2(-m[4], m[5]);
			} else {
				this.y = 0;
				this.z = Math.atan2(m[1], m[0]);
			}
		} else if (order === 'ZYX') {
			this.y = Math.asin(-Math.min(Math.max(m[2], -1), 1));
			if (Math.abs(m[2]) < 0.99999) {
				this.x = Math.atan2(m[6], m[10]);
				this.z = Math.atan2(m[1], m[0]);
			} else {
				this.x = 0;
				this.z = Math.atan2(-m[4], m[5]);
			}
		} else if (order === 'YZX') {
			this.z = Math.asin(Math.min(Math.max(m[1], -1), 1));
			if (Math.abs(m[1]) < 0.99999) {
				this.x = Math.atan2(-m[9], m[5]);
				this.y = Math.atan2(-m[2], m[0]);
			} else {
				this.x = 0;
				this.y = Math.atan2(m[8], m[10]);
			}
		} else if (order === 'XZY') {
			this.z = Math.asin(-Math.min(Math.max(m[4], -1), 1));
			if (Math.abs(m[4]) < 0.99999) {
				this.x = Math.atan2(m[6], m[5]);
				this.y = Math.atan2(m[8], m[0]);
			} else {
				this.x = Math.atan2(-m[9], m[10]);
				this.y = 0;
			}
		}

		this.onChange = evt;
			
        return this;
    },

    fromQuaternion: function (quaternion, order = this.order) {
		const tmpMat4 = new glw.Matrix4();
        tmpMat4.fromQuaternion(quaternion);
        return this.fromRotationMatrix(tmpMat4, order);
	},
	
	clone() {
        return new glw.Euler(this.x, this.y, this.z);
    }
};

glw.Quaternion = function ( x = 0, y = 0, z = 0, w = 1) {
	this.onChange = () => {};	

	let x_ = x;
	let y_ = y;
	let z_ = z;
	let w_ = w;

	Object.defineProperties(this, {
		x: {
			get: function () {
				return x_;
			},
			set: function(value) {
				x_ = value;
				this.onChange();
			},
		},
		y: {
			get: function () {
				return y_;
			},
			set: function(value) {
				y_ = value;
				this.onChange();
			},
		},
		z: {
			get: function () {
				return z_;
			},
			set: function(value) {
				z_ = value;
				this.onChange();
			},
		},
		w: {
			get: function () {
				return w_;
			},
			set: function(value) {
				w_ = value;
				this.onChange();
			},
		}
	});
};
glw.Quaternion.prototype = {

	constructor: glw.Quaternion,

	/**
	 * Set the components of a quat to the given values
	 *
	 * @param {Number} x X component
	 * @param {Number} y Y component
	 * @param {Number} z Z component
	 * @param {Number} w W component
	 */
	set: function(x, y = x, z = x, w = x) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
        this.onChange();
        return this;
	},

	/**
	 * Copy the values from one quat to another
	 *
	 * @param {Quaternion} q the source quaternion
	 */
	copy: function(q) {
		this.x = q.x;
		this.y = q.y;
		this.z = q.z;
		this.w = q.w;
        this.onChange();
        return this;
    },

	/**
	 * Adds two quat's
	 *
	 * @param {Quaternion} qa the first operand
	 * @param {Quaternion} qb the second operand
	 */
    add: function (qa, qb) {
        if (qb) {
            this.x = qa.x + qb.x;
            this.y = qa.y + qb.y;
            this.z = qa.z + qb.z;
            this.w = qa.w + qb.w;
        }
        else {
            this.x = this.x + qa.x;
            this.y = this.y + qa.y;
            this.z = this.z + qa.z;
            this.w = this.w + qa.w;
        }        
        return this;
	},

	/**
	 * Multiplies two quats
	 *
	 * @param {Quaternion} qa the first operand
	 * @param {Quaternion} qb the second operand
	 */
	multiply: function(qa, qb) {
        if (qb) {
			let ax = qa.x,
				ay = qa.y,
				az = qa.z,
				aw = qa.w;
			let bx = qb.x,
				by = qb.y,
				bz = qb.z,
				bw = qb.w;

			this.x = ax * bw + aw * bx + ay * bz - az * by;
			this.y = ay * bw + aw * by + az * bx - ax * bz;
			this.z = az * bw + aw * bz + ax * by - ay * bx;
			this.w = aw * bw - ax * bx - ay * by - az * bz;
		}
		else {
			let ax = this.x,
				ay = this.y,
				az = this.z,
				aw = this.w;
			let bx = qa.x,
				by = qa.y,
				bz = qa.z,
				bw = qa.w;

			this.x = ax * bw + aw * bx + ay * bz - az * by;
			this.y = ay * bw + aw * by + az * bx - ax * bz;
			this.z = az * bw + aw * bz + ax * by - ay * bx;
			this.w = aw * bw - ax * bx - ay * by - az * bz;
		}

        this.onChange();
        return this;
    },

	/**
	 * Calculates the inverse of a quat
	 *
	 * @param {Quaternion} q quat to calculate inverse of
	 */
	inverse: function(q = this) {
		let a0 = q.x,
			a1 = q.y,
			a2 = q.z,
			a3 = q.w;
		let dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
		let invDot = dot ? 1.0 / dot : 0;

		this.x = -a0 * invDot;
		this.y = -a1 * invDot;
		this.z = -a2 * invDot;
		this.w = a3 * invDot;

        this.onChange();
        return this;
	},
	
	/**
	 * Calculates the length of a quat
	 *
	 * @returns {Number} length of a
	 */
	length: function () {
		let x = this.x;
		let y = this.y;
		let z = this.z;
		let w = this.w;
		return Math.sqrt(x * x + y * y + z * z + w * w);
	},

	/**
	 * Scales a quat by a scalar number
	 *
	 * @param {Number} s amount to scale the quat by
	 */
	scale: function (s) {
		this.x = this.x * s;
		this.y = this.y * s;
		this.z = this.z * s;
		this.w = this.w * s;
		return this;
	},

	/**
	 * Normalize a quat
	 */
	normalize: function() {
		let len = this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
		if (len > 0) {
			len = 1 / Math.sqrt(len);
		}
		this.x = this.x * len;
		this.y = this.y * len;
		this.z = this.z * len;
		this.w = this.w * len;
        this.onChange();
        return this;
	},
	
	/**
	 * Calculates the dot product of two quat's
	 *
	 * @param {Quaternion} q the quat operand
	 * @returns {Number} dot product of a and b
	 */
	dot: function(q) {
		return this.x * q.x + this.y * q.y + this.z * q.z + this.w * q.w;
	},
	
	/**
	 * Performs a linear interpolation between two quat's
	 *
	 * @param {Quaternion} q the first operand
	 * @param {Number} t interpolation amount between the two inputs
	 */
	lerp: function (q, t) {
		this.x = this.x + t * (q.x - this.x);
		this.y = this.y + t * (q.y - this.y);
		this.z = this.z + t * (q.z - this.z);
		this.w = this.w + t * (q.w - this.w);
		return this;
	},

	/**
	 * Performs a spherical linear interpolation between two quat
	 *
	 * @param {Quaternion} q the quat operand
	 * @param {Number} t interpolation amount between the two inputs
	 */
	slerp: function(q, t) {
		let ax = this.x,
			ay = this.y,
			az = this.z,
			aw = this.w;
		let bx = q.x,
			by = q.y,
			bz = q.z,
			bw = q.w;

		let omega, cosom, sinom, scale0, scale1;

		// calc cosine
		cosom = ax * bx + ay * by + az * bz + aw * bw;
		// adjust signs (if necessary)
		if (cosom < 0.0) {
			cosom = -cosom;
			bx = -bx;
			by = -by;
			bz = -bz;
			bw = -bw;
		}
		// calculate coefficients
		if (1.0 - cosom > 0.000001) {
			// standard case (slerp)
			omega = Math.acos(cosom);
			sinom = Math.sin(omega);
			scale0 = Math.sin((1.0 - t) * omega) / sinom;
			scale1 = Math.sin(t * omega) / sinom;
		} else {
			// "from" and "to" quaternions are very close
			//  ... so we can do a linear interpolation
			scale0 = 1.0 - t;
			scale1 = t;
		}
		// calculate final values
		this.x = scale0 * ax + scale1 * bx;
		this.y = scale0 * ay + scale1 * by;
		this.z = scale0 * az + scale1 * bz;
		this.w = scale0 * aw + scale1 * bw;

        return this;
    },

	/**
	 * Set a quat to the identity quaternion
	 */
	identity: function() {
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.w = 1;
        this.onChange();
        return this;
    },

	/**
	 * Rotates a quaternion by the given angle about the X axis
	 *
	 * @param {number} rad angle (in radians) to rotate
	 */
    rotateX: function(rad) {
		rad *= 0.5;

		let ax = this.x,
			ay = this.y,
			az = this.z,
			aw = this.w;
		let bx = Math.sin(rad),
			bw = Math.cos(rad);

		this.x = ax * bw + aw * bx;
		this.y = ay * bw + az * bx;
		this.z = az * bw - ay * bx;
		this.w = aw * bw - ax * bx;

        this.onChange();
        return this;
    },

	/**
	 * Rotates a quaternion by the given angle about the Y axis
	 *
	 * @param {number} rad angle (in radians) to rotate
	 */
    rotateY: function(rad) {
		rad *= 0.5;

		let ax = this.x,
			ay = this.y,
			az = this.z,
			aw = this.w;
		let by = Math.sin(rad),
			bw = Math.cos(rad);

		this.x = ax * bw - az * by;
		this.y = ay * bw + aw * by;
		this.z = az * bw + ax * by;
		this.w = aw * bw - ay * by;

        this.onChange();
        return this;
    },

	/**
	 * Rotates a quaternion by the given angle about the Z axis
	 *
	 * @param {number} rad angle (in radians) to rotate
	 */
    rotateZ: function(rad) {
		rad *= 0.5;

		let ax = this.x,
			ay = this.y,
			az = this.z,
			aw = this.w;
		let bz = Math.sin(rad),
			bw = Math.cos(rad);

		this.x = ax * bw + ay * bz;
		this.y = ay * bw - ax * bz;
		this.z = az * bw + aw * bz;
		this.w = aw * bw - az * bz;

        this.onChange();
        return this;
    },

    /**
	 * Calculates the conjugate of a quat
	 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
	 *
	 * @param {Quaternion} q quat to calculate conjugate of
	 */
    conjugate: function(q = this) {
		this.x = -q.x;
		this.y = -q.y;
		this.z = -q.z;
		this.w = q.w;
        this.onChange();
        return this;
    }, 

	/**
	 * Creates a quaternion from the given 3x3 rotation matrix.
	 *
	 * NOTE: The resultant quaternion is not normalized, so you should be sure
	 * to renormalize the quaternion yourself where necessary.
	 *
	 * @param {Matrix3} m rotation matrix
	 */
    fromMatrix3: function(matrix) {
		let m = matrix.toArray();
		let out = this.toArray();
		// Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
		// article "Quaternion Calculus and Fast Animation".
		let fTrace = m[0] + m[4] + m[8];
		let fRoot;
	
		if (fTrace > 0.0) {
			// |w| > 1/2, may as well choose w > 1/2
			fRoot = Math.sqrt(fTrace + 1.0); // 2w
			out[3] = 0.5 * fRoot;
			fRoot = 0.5 / fRoot; // 1/(4w)
			out[0] = (m[5] - m[7]) * fRoot;
			out[1] = (m[6] - m[2]) * fRoot;
			out[2] = (m[1] - m[3]) * fRoot;
		} else {
			// |w| <= 1/2
			let i = 0;
			if (m[4] > m[0]) i = 1;
			if (m[8] > m[i * 3 + i]) i = 2;
			let j = (i + 1) % 3;
			let k = (i + 2) % 3;
	
			fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
			out[i] = 0.5 * fRoot;
			fRoot = 0.5 / fRoot;
			out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
			out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
			out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
		}

		this.fromArray(out);

        this.onChange();
        return this;
    },

	/**
	 * Creates a quaternion from the given euler angle x, y, z.
	 *
	 * @param {Euler} euler Angles to rotate around each axis in degrees.
	 */
    fromEuler: function(euler) {
		let order = euler.order || 'YXZ';
		
		let sx = Math.sin(euler.x * 0.5);
		let cx = Math.cos(euler.x * 0.5);
		let sy = Math.sin(euler.y * 0.5);
		let cy = Math.cos(euler.y * 0.5);
		let sz = Math.sin(euler.z * 0.5);
		let cz = Math.cos(euler.z * 0.5);

		if (order === 'XYZ') {
			this.x = sx * cy * cz + cx * sy * sz;
			this.y = cx * sy * cz - sx * cy * sz;
			this.z = cx * cy * sz + sx * sy * cz;
			this.w = cx * cy * cz - sx * sy * sz;
		} else if (order === 'YXZ') {
			this.x = sx * cy * cz + cx * sy * sz;
			this.y = cx * sy * cz - sx * cy * sz;
			this.z = cx * cy * sz - sx * sy * cz;
			this.w = cx * cy * cz + sx * sy * sz;
		} else if (order === 'ZXY') {
			this.x = sx * cy * cz - cx * sy * sz;
			this.y = cx * sy * cz + sx * cy * sz;
			this.z = cx * cy * sz + sx * sy * cz;
			this.w = cx * cy * cz - sx * sy * sz;
		} else if (order === 'ZYX') {
			this.x = sx * cy * cz - cx * sy * sz;
			this.y = cx * sy * cz + sx * cy * sz;
			this.z = cx * cy * sz - sx * sy * cz;
			this.w = cx * cy * cz + sx * sy * sz;
		} else if (order === 'YZX') {
			this.x = sx * cy * cz + cx * sy * sz;
			this.y = cx * sy * cz + sx * cy * sz;
			this.z = cx * cy * sz - sx * sy * cz;
			this.w = cx * cy * cz - sx * sy * sz;
		} else if (order === 'XZY') {
			this.x = sx * cy * cz - cx * sy * sz;
			this.y = cx * sy * cz - sx * cy * sz;
			this.z = cx * cy * sz + sx * sy * cz;
			this.w = cx * cy * cz + sx * sy * sz;
		}

        return this;
    },

	/**
	 * Sets a quat from the given angle and rotation axis,
	 * then returns it.
	 *
	 * @param {Vector3} axis the axis around which to rotate
	 * @param {Number} rad the angle in radians
	 **/
    fromAxisAngle: function(axis, a) {
		rad = rad * 0.5;
		let s = Math.sin(rad);
		this.x = s * axis.x;
		this.y = s * axis.y;
		this.z = s * axis.z;
		this.w = Math.cos(rad);
        return this;
    },

	/**
	 * Clones the quat
	 *
	 * @returns {Quaternion} cloned quat
	 */
	clone() {
        return new glw.Quaternion(this.x, this.y, this.z, this.w);
	},
	
	/**
	 * Creates the quat from array
	 */
    fromArray: function(a, o = 0) {
        this.x = a[o];
        this.y = a[o + 1];
        this.z = a[o + 2];
        this.w = a[o + 3];
        return this;
    },

	/**
	 * Creates the array from quat
	 *
	 * @returns {array} array with quat values
	 */
    toArray: function(a = [], o = 0) {
        a[o] = this.x;
        a[o + 1] = this.y;
        a[o + 2] = this.z;
        a[o + 3] = this.w;
        return a;
    }
};

glw.Color = function ( r = 0, g = 0, b = 0 ) {
	this.r = r;
	this.g = g;
	this.b = b;
};
glw.Color.prototype = {

	constructor: glw.Color,

	/**
	 * Set the components of a color from rgb values
	 *
	 * @param {color} r the red value
	 * @param {color} g the green value
	 * @param {color} b the blue value
	 */
	setRGB: function ( r, g, b ) {
		this.r = r;
		this.g = g;
		this.b = b;
		return this;
	},

	/**
	 * Set the components of a color from hsv values
	 *
	 * @param {color} h the hue value
	 * @param {color} s the saturation value
	 * @param {color} v the value/brightness value
	 */
	setHSV: function ( h, s, v ) {
		var i, f, p, q, t;
		if ( v === 0 ) {
			this.r = this.g = this.b = 0;
		} else {
			i = Math.floor( h * 6 );
			f = ( h * 6 ) - i;
			p = v * ( 1 - s );
			q = v * ( 1 - ( s * f ) );
			t = v * ( 1 - ( s * ( 1 - f ) ) );
			if ( i === 0 ) {
				this.r = v;
				this.g = t;
				this.b = p;
			} else if ( i === 1 ) {
				this.r = q;
				this.g = v;
				this.b = p;
			} else if ( i === 2 ) {
				this.r = p;
				this.g = v;
				this.b = t;
			} else if ( i === 3 ) {
				this.r = p;
				this.g = q;
				this.b = v;
			} else if ( i === 4 ) {
				this.r = t;
				this.g = p;
				this.b = v;
			} else if ( i === 5 ) {
				this.r = v;
				this.g = p;
				this.b = q;
			}
		}
		return this;
	},

	/**
	 * Set the components of a color from hex string
	 *
	 * @param {color} hex the hex string
	 */
	setHex: function ( hex ) {
		hex = Math.floor( hex );
		this.r = ( hex >> 16 & 255 ) / 255;
		this.g = ( hex >> 8 & 255 ) / 255;
		this.b = ( hex & 255 ) / 255;
		return this;
	},

	/**
	 * Copy the values from color
	 *
	 * @param {color} c the color operand
	 */
    copy: function (c) {
        this.r = c.r;
        this.g = c.g;
        this.b = c.b;
        return this;
	},

	/**
	 * Creates the color from array
	 */
	fromArray: function (a, o = 0) {
        this.r = a[o];
        this.g = a[o + 1];
        this.b = a[o + 2];
        return this;
    },

    /**
	 * Creates the color from vector
	 *
	 * @returns {array} array with color values
	 */
	toArray: function (a = [], o = 0) {
        a[o] = this.r;
        a[o + 1] = this.g;
        a[o + 2] = this.b;
        return a;
    }
};
//#endregion


//#region  Core
glw.RenderersCount = 0;
glw.ProgramsCount = 0;
glw.GeometriesCount = 0;
glw.GeometryAttributesCount = 0;
glw.MeshesCount = 0;
glw.TexturesCount = 0;


glw.Renderer = function ( { canvas = document.createElement('canvas'), width = 300, height = 150, dpr = 1, alpha = false, depth = true, stencil = false, antialias = false, premultipliedAlpha = false, preserveDrawingBuffer = false, powerPreference = 'default', autoClear = true, webgl = 2 } = {} ) {

	const tempVec3 = new glw.Vector3();
	
	const attributes = { alpha, depth, stencil, antialias, premultipliedAlpha, preserveDrawingBuffer, powerPreference };
	  
	this.dpr = dpr;
  	this.alpha = alpha;
 	this.color = true;
 	this.depth = depth;
   	this.stencil = stencil;
 	this.premultipliedAlpha = premultipliedAlpha;
  	this.autoClear = autoClear;
   	this.id = glw.RenderersCount++;


	this.init = function(){	
		// Attempt WebGL2 unless forced to 1, if not supported fallback to WebGL1
		if (webgl === 2) this.gl = canvas.getContext('webgl2', attributes);
			this.isWebgl2 = !!this.gl;
			if (!this.gl) {
		   		this.gl = canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);
	   	}
  
	   	// Attach renderer to gl so that all classes have access to internal state functions
		this.gl.renderer = this;

		// initialise size values
        this.setSize(width, height);

        // gl state stores to avoid redundant calls on methods used internally
        this.state = {};
        this.state.blendFunc = { src: this.gl.ONE, dst: this.gl.ZERO };
        this.state.blendEquation = { modeRGB: this.gl.FUNC_ADD };
        this.state.cullFace = null;
        this.state.frontFace = this.gl.CCW;
        this.state.depthMask = true;
        this.state.depthFunc = this.gl.LESS;
        this.state.premultiplyAlpha = false;
        this.state.flipY = false;
        this.state.unpackAlignment = 4;
        this.state.framebuffer = null;
        this.state.viewport = { width: null, height: null };
        this.state.textureUnits = [];
        this.state.activeTextureUnit = 0;
        this.state.boundBuffer = null;
        this.state.uniformLocations = new Map();

        // store requested extensions
        this.extensions = {};

        // Initialise extra format types
        if (this.isWebgl2) {
            this.getExtension('EXT_color_buffer_float');
            this.getExtension('OES_texture_float_linear');
        } else {
            this.getExtension('OES_texture_float');
            this.getExtension('OES_texture_float_linear');
            this.getExtension('OES_texture_half_float');
            this.getExtension('OES_texture_half_float_linear');
            this.getExtension('OES_element_index_uint');
            this.getExtension('OES_standard_derivatives');
            this.getExtension('EXT_sRGB');
            this.getExtension('WEBGL_depth_texture');
            this.getExtension('WEBGL_draw_buffers');
        }

        // Create method aliases using extension (WebGL1) or native if available (WebGL2)
        this.vertexAttribDivisor = this.getExtension('ANGLE_instanced_arrays', 'vertexAttribDivisor', 'vertexAttribDivisorANGLE');
        this.drawArraysInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawArraysInstanced', 'drawArraysInstancedANGLE');
        this.drawElementsInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawElementsInstanced', 'drawElementsInstancedANGLE');
        this.createVertexArray = this.getExtension('OES_vertex_array_object', 'createVertexArray', 'createVertexArrayOES');
        this.bindVertexArray = this.getExtension('OES_vertex_array_object', 'bindVertexArray', 'bindVertexArrayOES');
        this.deleteVertexArray = this.getExtension('OES_vertex_array_object', 'deleteVertexArray', 'deleteVertexArrayOES');
        this.drawBuffers = this.getExtension('WEBGL_draw_buffers', 'drawBuffers', 'drawBuffersWEBGL');

        // Store device parameters
        this.parameters = {};
        this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
        this.parameters.maxAnisotropy = this.getExtension('EXT_texture_filter_anisotropic')
            ? this.gl.getParameter(this.getExtension('EXT_texture_filter_anisotropic').MAX_TEXTURE_MAX_ANISOTROPY_EXT)
			: 0;
	};
		

	this.setSize = function (width, height) {
		this.width = width;
		this.height = height;

		this.gl.canvas.width = width * this.dpr;
		this.gl.canvas.height = height * this.dpr;

		Object.assign(this.gl.canvas.style, {
			width: width + 'px',
			height: height + 'px',
		});
	};

	this.setViewport = function (width, height) {
		if (this.state.viewport.width === width && this.state.viewport.height === height) return;
		this.state.viewport.width = width;
		this.state.viewport.height = height;
		this.gl.viewport(0, 0, width, height);
	};

	this.enable = function (id) {
		if (this.state[id] === true) return;
		this.gl.enable(id);
		this.state[id] = true;
	};

	this.disable = function (id) {
		if (this.state[id] === false) return;
		this.gl.disable(id);
		this.state[id] = false;
	};

	this.setBlendFunc = function (src, dst, srcAlpha, dstAlpha) {
		if (
			this.state.blendFunc.src === src &&
			this.state.blendFunc.dst === dst &&
			this.state.blendFunc.srcAlpha === srcAlpha &&
			this.state.blendFunc.dstAlpha === dstAlpha
		)
			return;
		this.state.blendFunc.src = src;
		this.state.blendFunc.dst = dst;
		this.state.blendFunc.srcAlpha = srcAlpha;
		this.state.blendFunc.dstAlpha = dstAlpha;
		if (srcAlpha !== undefined) this.gl.blendFuncSeparate(src, dst, srcAlpha, dstAlpha);
		else this.gl.blendFunc(src, dst);
	};

	this.setBlendEquation = function (modeRGB, modeAlpha) {
		modeRGB = modeRGB || this.gl.FUNC_ADD;
		if (this.state.blendEquation.modeRGB === modeRGB && this.state.blendEquation.modeAlpha === modeAlpha) return;
		this.state.blendEquation.modeRGB = modeRGB;
		this.state.blendEquation.modeAlpha = modeAlpha;
		if (modeAlpha !== undefined) this.gl.blendEquationSeparate(modeRGB, modeAlpha);
		else this.gl.blendEquation(modeRGB);
	};

	this.setCullFace = function (value) {
		if (this.state.cullFace === value) return;
		this.state.cullFace = value;
		this.gl.cullFace(value);
	};

	this.setFrontFace = function (value) {
		if (this.state.frontFace === value) return;
		this.state.frontFace = value;
		this.gl.frontFace(value);
	};

	this.setDepthMask = function (value) {
		if (this.state.depthMask === value) return;
		this.state.depthMask = value;
		this.gl.depthMask(value);
	};

	this.setDepthFunc = function (value) {
		if (this.state.depthFunc === value) return;
		this.state.depthFunc = value;
		this.gl.depthFunc(value);
	};

	this.activeTexture = function (value) {
		if (this.state.activeTextureUnit === value) return;
		this.state.activeTextureUnit = value;
		this.gl.activeTexture(this.gl.TEXTURE0 + value);
	};

	this.bindFramebuffer = function ({ target = this.gl.FRAMEBUFFER, buffer = null } = {}) {
		if (this.state.framebuffer === buffer) return;
		this.state.framebuffer = buffer;
		this.gl.bindFramebuffer(target, buffer);
	};

	this.getExtension = function (extension, webgl2Func, extFunc) {
		// if webgl2 function supported, return func bound to gl context
		if (webgl2Func && this.gl[webgl2Func]) return this.gl[webgl2Func].bind(this.gl);

		// fetch extension once only
		if (!this.extensions[extension]) {
			this.extensions[extension] = this.gl.getExtension(extension);
		}

		// return extension if no function requested
		if (!webgl2Func) return this.extensions[extension];

		// Return null if extension not supported
		if (!this.extensions[extension]) return null;

		// return extension function, bound to extension
		return this.extensions[extension][extFunc].bind(this.extensions[extension]);
	};

	this.sortOpaque = function (a, b) {
		if (a.renderOrder !== b.renderOrder) {
			return a.renderOrder - b.renderOrder;
		} else if (a.program.id !== b.program.id) {
			return a.program.id - b.program.id;
		} else if (a.zDepth !== b.zDepth) {
			return a.zDepth - b.zDepth;
		} else {
			return b.id - a.id;
		}
	};

	this.sortTransparent = function (a, b) {
		if (a.renderOrder !== b.renderOrder) {
			return a.renderOrder - b.renderOrder;
		}
		if (a.zDepth !== b.zDepth) {
			return b.zDepth - a.zDepth;
		} else {
			return b.id - a.id;
		}
	};

	this.sortUI = function (a, b) {
		if (a.renderOrder !== b.renderOrder) {
			return a.renderOrder - b.renderOrder;
		} else if (a.program.id !== b.program.id) {
			return a.program.id - b.program.id;
		} else {
			return b.id - a.id;
		}
	};

	this.getRenderList = function ({ scene, camera, frustumCull, sort }) {
		let renderList = [];

		if (camera && frustumCull) camera.updateFrustum();

		// Get visible
		scene.traverse((node) => {
			if (!node.visible) return true;
			if (!node.draw) return;

			if (frustumCull && node.frustumCulled && camera) {
				if (!camera.frustumIntersectsMesh(node)) return;
			}

			renderList.push(node);
		});

		if (sort) {
			const opaque = [];
			const transparent = []; // depthTest true
			const ui = []; // depthTest false

			renderList.forEach((node) => {
				// Split into the 3 render groups
				if (!node.program.transparent) {
					opaque.push(node);
				} else if (node.program.depthTest) {
					transparent.push(node);
				} else {
					ui.push(node);
				}

				node.zDepth = 0;

				// Only calculate z-depth if renderOrder unset and depthTest is true
				if (node.renderOrder !== 0 || !node.program.depthTest || !camera) return;

				// update z-depth
				node.worldMatrix.getTranslation(tempVec3);
				tempVec3.applyMatrix4(camera.projectionViewMatrix);
				node.zDepth = tempVec3.z;
			});

			opaque.sort(this.sortOpaque);
			transparent.sort(this.sortTransparent);
			ui.sort(this.sortUI);

			renderList = opaque.concat(transparent, ui);
		}

		return renderList;
	};

	this.render = function ({ scene, camera, target = null, update = true, sort = true, frustumCull = true, clear }) {
		if (target === null) {
			// make sure no render target bound so draws to canvas
			this.bindFramebuffer();
			this.setViewport(this.width * this.dpr, this.height * this.dpr);
		} else {
			// bind supplied render target and update viewport
			this.bindFramebuffer(target);
			this.setViewport(target.width, target.height);
		}

		if (clear || (this.autoClear && clear !== false)) {
			// Ensure depth buffer writing is enabled so it can be cleared
			if (this.depth && (!target || target.depth)) {
				this.enable(this.gl.DEPTH_TEST);
				this.setDepthMask(true);
			}
			this.gl.clear(
				(this.color ? this.gl.COLOR_BUFFER_BIT : 0) |
					(this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) |
					(this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0)
			);
		}

		// updates all scene graph matrices
		if (update) scene.updateMatrixWorld();

		// Update camera separately, in case not in scene graph
		if (camera) camera.updateMatrixWorld();

		// Get render list - entails culling and sorting
		const renderList = this.getRenderList({ scene, camera, frustumCull, sort });

		renderList.forEach((node) => {
			node.draw({ camera });
		});
	};


	this.init();

};

glw.Program = function ( gl, { vertex, fragment, uniforms = {}, transparent = false, cullFace = gl.BACK, frontFace = gl.CCW, depthTest = true, depthWrite = true, depthFunc = gl.LESS } = {} ) {

	// cache of typed arrays used to flatten uniform arrays
	const arrayCacheF32 = {};


	this.init = function () {
		if (!gl.canvas) console.error('gl not passed as fist argument to Program');
        this.gl = gl;
        this.uniforms = uniforms;
        this.id = glw.ProgramsCount++;

        if (!vertex) console.warn('vertex shader not supplied');
        if (!fragment) console.warn('fragment shader not supplied');

        // Store program state
        this.transparent = transparent;
        this.cullFace = cullFace;
        this.frontFace = frontFace;
        this.depthTest = depthTest;
        this.depthWrite = depthWrite;
        this.depthFunc = depthFunc;
        this.blendFunc = {};
        this.blendEquation = {};

        // set default blendFunc if transparent flagged
        if (this.transparent && !this.blendFunc.src) {
            if (this.gl.renderer.premultipliedAlpha) this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
            else this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        }

        // compile vertex shader and log errors
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertex);
        gl.compileShader(vertexShader);
        if (gl.getShaderInfoLog(vertexShader) !== '') {
            console.warn(`${gl.getShaderInfoLog(vertexShader)}\nVertex Shader\n${addLineNumbers(vertex)}`);
        }

        // compile fragment shader and log errors
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragment);
        gl.compileShader(fragmentShader);
        if (gl.getShaderInfoLog(fragmentShader) !== '') {
            console.warn(`${gl.getShaderInfoLog(fragmentShader)}\nFragment Shader\n${addLineNumbers(fragment)}`);
        }

        // compile program and log errors
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            return console.warn(gl.getProgramInfoLog(this.program));
        }

        // Remove shader once linked
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        // Get active uniform locations
        this.uniformLocations = new Map();
        let numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        for (let uIndex = 0; uIndex < numUniforms; uIndex++) {
            let uniform = gl.getActiveUniform(this.program, uIndex);
            this.uniformLocations.set(uniform, gl.getUniformLocation(this.program, uniform.name));

            // split uniforms' names to separate array and struct declarations
            const split = uniform.name.match(/(\w+)/g);

            uniform.uniformName = split[0];

            if (split.length === 3) {
                uniform.isStructArray = true;
                uniform.structIndex = Number(split[1]);
                uniform.structProperty = split[2];
            } else if (split.length === 2 && isNaN(Number(split[1]))) {
                uniform.isStruct = true;
                uniform.structProperty = split[1];
            }
        }

        // Get active attribute locations
        this.attributeLocations = new Map();
        const locations = [];
        const numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
        for (let aIndex = 0; aIndex < numAttribs; aIndex++) {
            const attribute = gl.getActiveAttrib(this.program, aIndex);
            const location = gl.getAttribLocation(this.program, attribute.name);
            locations[location] = attribute.name;
            this.attributeLocations.set(attribute, location);
        }
        this.attributeOrder = locations.join('');
	}


	this.setBlendFunc = function (src, dst, srcAlpha, dstAlpha) {
        this.blendFunc.src = src;
        this.blendFunc.dst = dst;
        this.blendFunc.srcAlpha = srcAlpha;
        this.blendFunc.dstAlpha = dstAlpha;
        if (src) this.transparent = true;
    };

    this.setBlendEquation = function (modeRGB, modeAlpha) {
        this.blendEquation.modeRGB = modeRGB;
        this.blendEquation.modeAlpha = modeAlpha;
    };

    this.applyState = function () {
        if (this.depthTest) this.gl.renderer.enable(this.gl.DEPTH_TEST);
        else this.gl.renderer.disable(this.gl.DEPTH_TEST);

        if (this.cullFace) this.gl.renderer.enable(this.gl.CULL_FACE);
        else this.gl.renderer.disable(this.gl.CULL_FACE);

        if (this.blendFunc.src) this.gl.renderer.enable(this.gl.BLEND);
        else this.gl.renderer.disable(this.gl.BLEND);

        if (this.cullFace) this.gl.renderer.setCullFace(this.cullFace);
        this.gl.renderer.setFrontFace(this.frontFace);
        this.gl.renderer.setDepthMask(this.depthWrite);
        this.gl.renderer.setDepthFunc(this.depthFunc);
        if (this.blendFunc.src)
            this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha);
        this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha);
    };

    this.use = function ({ flipFaces = false } = {}) {
        let textureUnit = -1;
        const programActive = this.gl.renderer.currentProgram === this.id;

        // Avoid gl call if program already in use
        if (!programActive) {
            this.gl.useProgram(this.program);
            this.gl.renderer.currentProgram = this.id;
        }

        // Set only the active uniforms found in the shader
        this.uniformLocations.forEach((location, activeUniform) => {
            let name = activeUniform.uniformName;

            // get supplied uniform
            let uniform = this.uniforms[name];

            // For structs, get the specific property instead of the entire object
            if (activeUniform.isStruct) {
                uniform = uniform[activeUniform.structProperty];
                name += `.${activeUniform.structProperty}`;
            }
            if (activeUniform.isStructArray) {
                uniform = uniform[activeUniform.structIndex][activeUniform.structProperty];
                name += `[${activeUniform.structIndex}].${activeUniform.structProperty}`;
            }

            if (!uniform) {
                return warn(`Active uniform ${name} has not been supplied`);
            }

            if (uniform && uniform.value === undefined) {
                return warn(`${name} uniform is missing a value parameter`);
            }

            if (uniform.value.texture) {
                textureUnit = textureUnit + 1;

                // Check if texture needs to be updated
                uniform.value.update(textureUnit);
                return setUniform(this.gl, activeUniform.type, location, textureUnit);
            }

            // For texture arrays, set uniform as an array of texture units instead of just one
            if (Array.isArray(uniform.value) && uniform.value[0].texture) {
                const textureUnits = [];
                uniform.value.forEach((value) => {
                    textureUnit = textureUnit + 1;
                    value.update(textureUnit);
                    textureUnits.push(textureUnit);
                });

                return setUniform(this.gl, activeUniform.type, location, textureUnits);
            }

            setUniform(this.gl, activeUniform.type, location, uniform.value);
        });

        this.applyState();
        if (flipFaces) this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW);
    };

    this.remove = function () {
        this.gl.deleteProgram(this.program);
	}
	

	function setUniform(gl, type, location, value) {
		value = Array.isArray(value) ? flatten(value) : value;
		const setValue = gl.renderer.state.uniformLocations.get(location);

		// Avoid redundant uniform commands
		if (Array.isArray(value)) {
			if (setValue === undefined || setValue.length !== value.length) {
				// clone array to store as cache
				gl.renderer.state.uniformLocations.set(location, value.slice(0));
			} else {
				if (arraysEqual(setValue, value)) return;

				// Update cached array values
				setValue.set ? setValue.set(value) : setArray(setValue, value);
				gl.renderer.state.uniformLocations.set(location, setValue);
			}
		} else {
			if (setValue === value) return;
			gl.renderer.state.uniformLocations.set(location, value);
		}

		switch (type) {
			case 5126:
				return Array.isArray(value) ? gl.uniform1fv(location, value) : gl.uniform1f(location, value); // FLOAT
			case 35664:
				return gl.uniform2fv(location, Array.isArray(value) ? value : value.toArray()); // FLOAT_VEC2
			case 35665:
				return gl.uniform3fv(location, Array.isArray(value) ? value : value.toArray()); // FLOAT_VEC3
			case 35666:
				return gl.uniform4fv(location, value); // FLOAT_VEC4
			case 35670: // BOOL
			case 5124: // INT
			case 35678: // SAMPLER_2D
			case 35680:
				return Array.isArray(value) ? gl.uniform1iv(location, value) : gl.uniform1i(location, value); // SAMPLER_CUBE
			case 35671: // BOOL_VEC2
			case 35667:
				return gl.uniform2iv(location, value); // INT_VEC2
			case 35672: // BOOL_VEC3
			case 35668:
				return gl.uniform3iv(location, value); // INT_VEC3
			case 35673: // BOOL_VEC4
			case 35669:
				return gl.uniform4iv(location, value); // INT_VEC4
			case 35674:
				return gl.uniformMatrix2fv(location, false, Array.isArray(value) ? value : value.toArray()); // FLOAT_MAT2
			case 35675:
				return gl.uniformMatrix3fv(location, false, Array.isArray(value) ? value : value.toArray()); // FLOAT_MAT3
			case 35676:
				return gl.uniformMatrix4fv(location, false, Array.isArray(value) ? value : value.toArray()); // FLOAT_MAT4
		}
	}

	function addLineNumbers(string) {
		let lines = string.split('\n');
		for (let i = 0; i < lines.length; i++) {
			lines[i] = i + 1 + ': ' + lines[i];
		}
		return lines.join('\n');
	}

	function flatten(a) {
		const arrayLen = a.length;
		const valueLen = a[0].length;
		if (valueLen === undefined) return a;
		const length = arrayLen * valueLen;
		let value = arrayCacheF32[length];
		if (!value) arrayCacheF32[length] = value = new Float32Array(length);
		for (let i = 0; i < arrayLen; i++) value.set(a[i], i * valueLen);
		return value;
	}

	function arraysEqual(a, b) {
		if (a.length !== b.length) return false;
		for (let i = 0, l = a.length; i < l; i++) {
			if (a[i] !== b[i]) return false;
		}
		return true;
	}

	function setArray(a, b) {
		for (let i = 0, l = a.length; i < l; i++) {
			a[i] = b[i];
		}
	}

	let warnCount = 0;
	function warn(message) {
		if (warnCount > 100) return;
		console.warn(message);
		warnCount++;
		if (warnCount > 100) console.warn('More than 100 program warnings - stopping logs.');
	}


	this.init();

};

glw.Camera = function ( { near = 0.1, far = 100, fov = 45, aspect = 1, left, right, bottom, top, zoom = 1 } = {} ) {

	this.parent = null;
	this.visible = true;
	this.matrix = new glw.Matrix4();
	this.worldMatrix = new glw.Matrix4();
	this.matrixAutoUpdate = true;

	this.position = new glw.Vector3();
	this.quaternion = new glw.Quaternion();
	this.scale = new glw.Vector3(1);
	this.rotation = new glw.Euler();
	this.up = new glw.Vector3(0, 1, 0);

	this.rotation.onChange = () => this.quaternion.fromEuler(this.rotation);
	this.quaternion.onChange = () => this.rotation.fromQuaternion(this.quaternion);

    this.updateMatrix = function () {
        this.matrix.compose(this.quaternion, this.position, this.scale);
        this.worldMatrixNeedsUpdate = true;
    };

	this.traverse = function (callback) {
        // Return true in callback to stop traversing children
        if (callback(this)) return;
    };

    this.decompose = function () {
        this.matrix.getTranslation(this.position);
        this.matrix.getRotation(this.quaternion);
        this.matrix.getScaling(this.scale);
        this.rotation.fromQuaternion(this.quaternion);
    };

    this.lookAt = function (target) {
        this.matrix.lookAt(this.position, target, this.up);
        this.matrix.getRotation(this.quaternion);
		this.rotation.fromQuaternion(this.quaternion);
		return this;
    };

	
	const tempMat4 = new glw.Matrix4();
	const tempVec3a = new glw.Vector3();
	const tempVec3b = new glw.Vector3();

	Object.assign(this, { near, far, fov, aspect, left, right, bottom, top, zoom });

	this.projectionMatrix = new glw.Matrix4();
	this.viewMatrix = new glw.Matrix4();
	this.projectionViewMatrix = new glw.Matrix4();
	this.worldPosition = new glw.Vector3();

	// Use orthographic if left/right set, else default to perspective camera
	this.type = left || right ? 'orthographic' : 'perspective';


	this.init = function () {
		if (this.type === 'orthographic') this.orthographic();
        else this.perspective();
	}

	this.perspective = function ({ near = this.near, far = this.far, fov = this.fov, aspect = this.aspect } = {}) {
        Object.assign(this, { near, far, fov, aspect });
        this.projectionMatrix.fromPerspective({ fov: fov * (Math.PI / 180), aspect, near, far });
		this.type = 'perspective';
        return this;
    };

    this.orthographic = function ({
        near = this.near,
        far = this.far,
        left = this.left,
        right = this.right,
        bottom = this.bottom,
        top = this.top,
        zoom = this.zoom,
    } = {}) {
        Object.assign(this, { near, far, left, right, bottom, top, zoom });
        left /= zoom;
        right /= zoom;
        bottom /= zoom;
        top /= zoom;
        this.projectionMatrix.fromOrthogonal({ left, right, bottom, top, near, far });
        this.type = 'orthographic';
        return this;
    };

    this.updateMatrixWorld = function (force) {
        if (this.matrixAutoUpdate) this.updateMatrix();
        if (this.worldMatrixNeedsUpdate || force) {
            if (this.parent === null) this.worldMatrix.copy(this.matrix);
            else this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix);
            this.worldMatrixNeedsUpdate = false;
            force = true;
        }
		
        this.viewMatrix.inverse(this.worldMatrix);
        this.worldMatrix.getTranslation(this.worldPosition);

        // used for sorting
        this.projectionViewMatrix.multiply(this.projectionMatrix, this.viewMatrix);
        return this;
    };

    // Project 3D coordinate to 2D point
    this.project = function (v) {
        v.applyMatrix4(this.viewMatrix);
		v.applyMatrix4(this.projectionMatrix);
        return this;
    };

    // Unproject 2D point to 3D coordinate
    this.unproject = function (v) {
        v.applyMatrix4(tempMat4.inverse(this.projectionMatrix));
        v.applyMatrix4(this.worldMatrix);
        return this;
    };

    this.updateFrustum = function () {
        if (!this.frustum) {
            this.frustum = [new glw.Vector3(), new glw.Vector3(), new glw.Vector3(), new glw.Vector3(), new glw.Vector3(), new glw.Vector3()];
        }

        const m = this.projectionViewMatrix.toArray();
        this.frustum[0].set(m[3] - m[0], m[7] - m[4], m[11] - m[8]).constant = m[15] - m[12]; // -x
        this.frustum[1].set(m[3] + m[0], m[7] + m[4], m[11] + m[8]).constant = m[15] + m[12]; // +x
        this.frustum[2].set(m[3] + m[1], m[7] + m[5], m[11] + m[9]).constant = m[15] + m[13]; // +y
        this.frustum[3].set(m[3] - m[1], m[7] - m[5], m[11] - m[9]).constant = m[15] - m[13]; // -y
        this.frustum[4].set(m[3] - m[2], m[7] - m[6], m[11] - m[10]).constant = m[15] - m[14]; // +z (far)
        this.frustum[5].set(m[3] + m[2], m[7] + m[6], m[11] + m[10]).constant = m[15] + m[14]; // -z (near)

        for (let i = 0; i < 6; i++) {
            const invLen = 1.0 / this.frustum[i].distance();
            this.frustum[i].multiply(invLen);
            this.frustum[i].constant *= invLen;
        }
    };

    this.frustumIntersectsMesh = function (node) {
        // If no position attribute, treat as frustumCulled false
        if (!node.geometry.attributes.position) return true;

        if (!node.geometry.bounds || node.geometry.bounds.radius === Infinity) node.geometry.computeBoundingSphere();

        if (!node.geometry.bounds) return true;

        const center = tempVec3a;
        center.copy(node.geometry.bounds.center);
        center.applyMatrix4(node.worldMatrix);

        const radius = node.geometry.bounds.radius * node.worldMatrix.getMaxScaleOnAxis();

        return this.frustumIntersectsSphere(center, radius);
    };

    this.frustumIntersectsSphere = function (center, radius) {
        const normal = tempVec3b;

        for (let i = 0; i < 6; i++) {
            const plane = this.frustum[i];
            const distance = normal.copy(plane).dot(center) + plane.constant;
            if (distance < -radius) return false;
        }
        return true;
    };


	this.init();
	
};

glw.Scene = function () {

	this.parent = null;
	this.children = [];
	this.visible = true;

	this.matrix = new glw.Matrix4();
	this.worldMatrix = new glw.Matrix4();
	this.matrixAutoUpdate = true;

	this.position = new glw.Vector3();
	this.quaternion = new glw.Quaternion();
	this.scale = new glw.Vector3(1);
	this.rotation = new glw.Euler();
	this.up = new glw.Vector3(0, 1, 0);

	this.rotation.onChange = () => this.quaternion.fromEuler(this.rotation);
	this.quaternion.onChange = () => this.rotation.fromQuaternion(this.quaternion);


    this.add = function (child, notifyChild = true) {
        if (!~this.children.indexOf(child)) this.children.push(child);
        if (notifyChild) child.parent = this;
    };

    this.remove = function (child, notifyChild = true) {
        if (!!~this.children.indexOf(child)) this.children.splice(this.children.indexOf(child), 1);
        if (notifyChild) child.parent = null;
    };

    this.updateMatrixWorld = function (force) {
        if (this.matrixAutoUpdate) this.updateMatrix();
        if (this.worldMatrixNeedsUpdate || force) {
            if (this.parent === null) this.worldMatrix.copy(this.matrix);
            else this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix);
            this.worldMatrixNeedsUpdate = false;
			force = true;
        }

        for (let i = 0, l = this.children.length; i < l; i++) {
            this.children[i].updateMatrixWorld(force);
        }
    };

    this.updateMatrix = function () {
        this.matrix.compose(this.quaternion, this.position, this.scale);
        this.worldMatrixNeedsUpdate = true;
    };

    this.traverse = function (callback) {
        // Return true in callback to stop traversing children
        if (callback(this)) return;
        for (let i = 0, l = this.children.length; i < l; i++) {
            this.children[i].traverse(callback);
        }
    };

    this.decompose = function () {
        this.matrix.getTranslation(this.position);
        this.matrix.getRotation(this.quaternion);
        this.matrix.getScaling(this.scale);
        this.rotation.fromQuaternion(this.quaternion);
	};
	
};

glw.OrbitControls = function ( object, { element = document, enabled = true, target = new glw.Vector3(), ease = 0.25, inertia = 0.85, enableRotate = true, rotateSpeed = 0.1, autoRotate = false, autoRotateSpeed = 1.0, enableZoom = true, zoomSpeed = 1, enablePan = true, panSpeed = 0.1, minPolarAngle = 0, maxPolarAngle = Math.PI, minAzimuthAngle = -Infinity, maxAzimuthAngle = Infinity, minDistance = 0, maxDistance = Infinity } = {} ) {
	
	const STATE = { NONE: -1, ROTATE: 0, DOLLY: 1, PAN: 2, DOLLY_PAN: 3 };
	
	const tempVec3 = new glw.Vector3();
	const tempVec2a = new glw.Vector2();
	const tempVec2b = new glw.Vector2();
	
	this.enabled = enabled;
	this.target = target;

	// Catch attempts to disable - set to 1 so has no effect
	ease = ease || 1;
	inertia = inertia || 0;

	this.minDistance = minDistance;
	this.maxDistance = maxDistance;

	// current position in sphericalTarget coordinates
	const sphericalDelta = { radius: 1, phi: 0, theta: 0 };
	const sphericalTarget = { radius: 1, phi: 0, theta: 0 };
	const spherical = { radius: 1, phi: 0, theta: 0 };
	const panDelta = new glw.Vector3();

	// Grab initial position values
	const offset = new glw.Vector3();
	offset.copy(object.position).sub(this.target);
	spherical.radius = sphericalTarget.radius = offset.distance();
	spherical.theta = sphericalTarget.theta = Math.atan2(offset.x, offset.z);
	spherical.phi = sphericalTarget.phi = Math.acos(Math.min(Math.max(offset.y / sphericalTarget.radius, -1), 1));

	this.offset = offset;


	this.update = () => {
        if (autoRotate) {
            handleAutoRotate();
        }

        // apply delta
        sphericalTarget.radius *= sphericalDelta.radius;
        sphericalTarget.theta += sphericalDelta.theta;
        sphericalTarget.phi += sphericalDelta.phi;

        // apply boundaries
        sphericalTarget.theta = Math.max(minAzimuthAngle, Math.min(maxAzimuthAngle, sphericalTarget.theta));
        sphericalTarget.phi = Math.max(minPolarAngle, Math.min(maxPolarAngle, sphericalTarget.phi));
        sphericalTarget.radius = Math.max(this.minDistance, Math.min(this.maxDistance, sphericalTarget.radius));

        // ease values
        spherical.phi += (sphericalTarget.phi - spherical.phi) * ease;
        spherical.theta += (sphericalTarget.theta - spherical.theta) * ease;
        spherical.radius += (sphericalTarget.radius - spherical.radius) * ease;

        // apply pan to target. As offset is relative to target, it also shifts
        this.target.add(panDelta);

        // apply rotation to offset
        let sinPhiRadius = spherical.radius * Math.sin(Math.max(0.000001, spherical.phi));
        offset.x = sinPhiRadius * Math.sin(spherical.theta);
        offset.y = spherical.radius * Math.cos(spherical.phi);
        offset.z = sinPhiRadius * Math.cos(spherical.theta);

        // Apply updated values to object
        object.position.copy(this.target).add(offset);
		object.lookAt(this.target);
		
		//console.log(object);

        // Apply inertia to values
        sphericalDelta.theta *= inertia;
        sphericalDelta.phi *= inertia;
        panDelta.multiply(inertia);

        // Reset scale every frame to avoid applying scale multiple times
        sphericalDelta.radius = 1;
    };

    // Updates internals with new position
    this.forcePosition = () => {
        offset.copy(object.position).sub(this.target);
        spherical.radius = sphericalTarget.radius = offset.distance();
        spherical.theta = sphericalTarget.theta = Math.atan2(offset.x, offset.z);
        spherical.phi = sphericalTarget.phi = Math.acos(Math.min(Math.max(offset.y / sphericalTarget.radius, -1), 1));
        object.lookAt(this.target);
    };

    // Everything below here just updates panDelta and sphericalDelta
    // Using those two objects' values, the orbit is calculated

    const rotateStart = new glw.Vector2();
    const panStart = new glw.Vector2();
    const dollyStart = new glw.Vector2();

    let state = STATE.NONE;
    this.mouseButtons = { ORBIT: 0, ZOOM: 1, PAN: 2 };

    function getZoomScale() {
        return Math.pow(0.95, zoomSpeed);
    }

    function panLeft(distance, m) {
		tempVec3.set(m.m00,m.m01,m.m02);
        tempVec3.multiply(-distance);
        panDelta.add(tempVec3);
    }

    function panUp(distance, m) {
		tempVec3.set(m.m10,m.m11,m.m12);
        tempVec3.multiply(distance);
        panDelta.add(tempVec3);
    }

    const pan = (deltaX, deltaY) => {
        let el = element === document ? document.body : element;
        tempVec3.copy(object.position).sub(this.target);
        let targetDistance = tempVec3.distance();
        targetDistance *= Math.tan((((object.fov || 45) / 2) * Math.PI) / 180.0);
        panLeft((2 * deltaX * targetDistance) / el.clientHeight, object.matrix);
        panUp((2 * deltaY * targetDistance) / el.clientHeight, object.matrix);
    };

    function dolly(dollyScale) {
        sphericalDelta.radius /= dollyScale;
    }

    function handleAutoRotate() {
        const angle = ((2 * Math.PI) / 60 / 60) * autoRotateSpeed;
        sphericalDelta.theta -= angle;
    }

    function handleMoveRotate(x, y) {
		
        tempVec2a.set(x, y);
        tempVec2b.sub(tempVec2a, rotateStart).multiply(rotateSpeed);
        let el = element === document ? document.body : element;
        sphericalDelta.theta -= (2 * Math.PI * tempVec2b.x) / el.clientHeight;
        sphericalDelta.phi -= (2 * Math.PI * tempVec2b.y) / el.clientHeight;
        rotateStart.copy(tempVec2a);
    }

    function handleMouseMoveDolly(e) {
        tempVec2a.set(e.clientX, e.clientY);
        tempVec2b.sub(tempVec2a, dollyStart);
        if (tempVec2b.y > 0) {
            dolly(getZoomScale());
        } else if (tempVec2b.y < 0) {
            dolly(1 / getZoomScale());
        }
        dollyStart.copy(tempVec2a);
    }

    function handleMovePan(x, y) {
        tempVec2a.set(x, y);
        tempVec2b.sub(tempVec2a, panStart).multiply(panSpeed);
        pan(tempVec2b.x, tempVec2b.y);
        panStart.copy(tempVec2a);
    }

    function handleTouchStartDollyPan(e) {
        if (enableZoom) {
            let dx = e.touches[0].pageX - e.touches[1].pageX;
            let dy = e.touches[0].pageY - e.touches[1].pageY;
            let distance = Math.sqrt(dx * dx + dy * dy);
            dollyStart.set(0, distance);
        }

        if (enablePan) {
            let x = 0.5 * (e.touches[0].pageX + e.touches[1].pageX);
            let y = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
            panStart.set(x, y);
        }
    }

    function handleTouchMoveDollyPan(e) {
        if (enableZoom) {
            let dx = e.touches[0].pageX - e.touches[1].pageX;
            let dy = e.touches[0].pageY - e.touches[1].pageY;
            let distance = Math.sqrt(dx * dx + dy * dy);
            tempVec2a.set(0, distance);
            tempVec2b.set(0, Math.pow(tempVec2a.y / dollyStart.y, zoomSpeed));
            dolly(tempVec2b.y);
            dollyStart.copy(tempVec2a);
        }

        if (enablePan) {
            let x = 0.5 * (e.touches[0].pageX + e.touches[1].pageX);
            let y = 0.5 * (e.touches[0].pageY + e.touches[1].pageY);
            handleMovePan(x, y);
        }
    }

    const onMouseDown = (e) => {
        if (!this.enabled) return;

        switch (e.button) {
            case this.mouseButtons.ORBIT:
                if (enableRotate === false) return;
                rotateStart.set(e.clientX, e.clientY);
                state = STATE.ROTATE;
                break;
            case this.mouseButtons.ZOOM:
                if (enableZoom === false) return;
                dollyStart.set(e.clientX, e.clientY);
                state = STATE.DOLLY;
                break;
            case this.mouseButtons.PAN:
                if (enablePan === false) return;
                panStart.set(e.clientX, e.clientY);
                state = STATE.PAN;
                break;
        }

        if (state !== STATE.NONE) {
            window.addEventListener('mousemove', onMouseMove, false);
            window.addEventListener('mouseup', onMouseUp, false);
        }
    };

    const onMouseMove = (e) => {
        if (!this.enabled) return;

        switch (state) {
            case STATE.ROTATE:
                if (enableRotate === false) return;
                handleMoveRotate(e.clientX, e.clientY);
                break;
            case STATE.DOLLY:
                if (enableZoom === false) return;
                handleMouseMoveDolly(e);
                break;
            case STATE.PAN:
                if (enablePan === false) return;
                handleMovePan(e.clientX, e.clientY);
                break;
        }
    };

    const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove, false);
        window.removeEventListener('mouseup', onMouseUp, false);
        state = STATE.NONE;
    };

    const onMouseWheel = (e) => {
        if (!this.enabled || !enableZoom || (state !== STATE.NONE && state !== STATE.ROTATE)) return;
        e.stopPropagation();
        e.preventDefault();

        if (e.deltaY < 0) {
            dolly(1 / getZoomScale());
        } else if (e.deltaY > 0) {
            dolly(getZoomScale());
        }
    };

    const onTouchStart = (e) => {
        if (!this.enabled) return;
        e.preventDefault();

        switch (e.touches.length) {
            case 1:
                if (enableRotate === false) return;
                rotateStart.set(e.touches[0].pageX, e.touches[0].pageY);
                state = STATE.ROTATE;
                break;
            case 2:
                if (enableZoom === false && enablePan === false) return;
                handleTouchStartDollyPan(e);
                state = STATE.DOLLY_PAN;
                break;
            default:
                state = STATE.NONE;
        }
    };

    const onTouchMove = (e) => {
        if (!this.enabled) return;
        e.preventDefault();
        e.stopPropagation();

        switch (e.touches.length) {
            case 1:
                if (enableRotate === false) return;
                handleMoveRotate(e.touches[0].pageX, e.touches[0].pageY);
                break;
            case 2:
                if (enableZoom === false && enablePan === false) return;
                handleTouchMoveDollyPan(e);
                break;
            default:
                state = STATE.NONE;
        }
    };

    const onTouchEnd = () => {
        if (!this.enabled) return;
        state = STATE.NONE;
    };

    const onContextMenu = (e) => {
        if (!this.enabled) return;
        e.preventDefault();
    };

    function addHandlers() {
        element.addEventListener('contextmenu', onContextMenu, false);
        element.addEventListener('mousedown', onMouseDown, false);
        element.addEventListener('wheel', onMouseWheel, { passive: false });
        element.addEventListener('touchstart', onTouchStart, { passive: false });
        element.addEventListener('touchend', onTouchEnd, false);
        element.addEventListener('touchmove', onTouchMove, { passive: false });
    }

    this.remove = function () {
        element.removeEventListener('contextmenu', onContextMenu);
        element.removeEventListener('mousedown', onMouseDown);
        element.removeEventListener('wheel', onMouseWheel);
        element.removeEventListener('touchstart', onTouchStart);
        element.removeEventListener('touchend', onTouchEnd);
        element.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    };

    addHandlers();

};

glw.Geometry = function (gl, attributes = {}) {

	const tempVec3 = new glw.Vector3();
	// To stop inifinite warnings
	let isBoundsWarned = false;

	if (!gl.canvas) console.error('gl not passed as first argument to Geometry');
	this.gl = gl;	
	this.attributes = attributes;
	this.id = glw.GeometriesCount++;

	// Store one VAO per program attribute locations order
	this.VAOs = {};

	this.drawRange = { start: 0, count: 0 };
	this.instancedCount = 0;

	// Unbind current VAO so that new buffers don't get added to active mesh
	this.gl.renderer.bindVertexArray(null);
	this.gl.renderer.currentGeometry = null;

	// Alias for state store to avoid redundant calls for global state
	this.glState = this.gl.renderer.state;


	this.addAttribute = function (key, attr) {
		attributes[key] = attr;

		// Set options
		attr.id = glw.GeometryAttributesCount++; // TODO: currently unused, remove?
		attr.size = attr.size || 1;
		attr.type =
			attr.type ||
			(attr.data.constructor === Float32Array
				? this.gl.FLOAT
				: attr.data.constructor === Uint16Array
				? this.gl.UNSIGNED_SHORT
				: this.gl.UNSIGNED_INT); // Uint32Array
		attr.target = key === 'index' ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER;
		attr.normalized = attr.normalized || false;
		attr.stride = attr.stride || 0;
		attr.offset = attr.offset || 0;
		attr.count = attr.count || (attr.stride ? attr.data.byteLength / attr.stride : attr.data.length / attr.size);
		attr.divisor = attr.instanced || 0;
		attr.needsUpdate = false;

		if (!attr.buffer) {
			attr.buffer = this.gl.createBuffer();

			// Push data to buffer
			this.updateAttribute(attr);
		}

		// Update geometry counts. If indexed, ignore regular attributes
		if (attr.divisor) {
			this.isInstanced = true;
			if (this.instancedCount && this.instancedCount !== attr.count * attr.divisor) {
				console.warn('geometry has multiple instanced buffers of different length');
				return (this.instancedCount = Math.min(this.instancedCount, attr.count * attr.divisor));
			}
			this.instancedCount = attr.count * attr.divisor;
		} else if (key === 'index') {
			this.drawRange.count = attr.count;
		} else if (!attributes.index) {
			this.drawRange.count = Math.max(this.drawRange.count, attr.count);
		}
	};

	this.updateAttribute = function (attr) {
		if (this.glState.boundBuffer !== attr.buffer) {
			this.gl.bindBuffer(attr.target, attr.buffer);
			this.glState.boundBuffer = attr.buffer;
		}
		this.gl.bufferData(attr.target, attr.data, this.gl.STATIC_DRAW);
		attr.needsUpdate = false;
	};

	this.setIndex = function (value) {
		this.addAttribute('index', value);
	};

	this.setDrawRange = function (start, count) {
		this.drawRange.start = start;
		this.drawRange.count = count;
	};

	this.setInstancedCount = function (value) {
		this.instancedCount = value;
	};

	this.createVAO = function (program) {
		this.VAOs[program.attributeOrder] = this.gl.renderer.createVertexArray();
		this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
		this.bindAttributes(program);
	};

	this.bindAttributes = function (program) {
		// Link all attributes to program using gl.vertexAttribPointer
		program.attributeLocations.forEach((location, { name, type }) => {
			// If geometry missing a required shader attribute
			if (!attributes[name]) {
				console.warn(`active attribute ${name} not being supplied`);
				return;
			}

			const attr = attributes[name];
			this.gl.bindBuffer(attr.target, attr.buffer);
			this.glState.boundBuffer = attr.buffer;

			// For matrix attributes, buffer needs to be defined per column
			let numLoc = 1;
			if (type === 35674) numLoc = 2; // mat2
			if (type === 35675) numLoc = 3; // mat3
			if (type === 35676) numLoc = 4; // mat4

			const size = attr.size / numLoc;
			const stride = numLoc === 1 ? 0 : numLoc * numLoc * numLoc;
			const offset = numLoc === 1 ? 0 : numLoc * numLoc;

			for (let i = 0; i < numLoc; i++) {
				this.gl.vertexAttribPointer(location + i, size, attr.type, attr.normalized, attr.stride + stride, attr.offset + i * offset);
				this.gl.enableVertexAttribArray(location + i);

				// For instanced attributes, divisor needs to be set.
				// For firefox, need to set back to 0 if non-instanced drawn after instanced. Else won't render
				this.gl.renderer.vertexAttribDivisor(location + i, attr.divisor);
			}
		});

		// Bind indices if geometry indexed
		if (attributes.index) this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, attributes.index.buffer);
	};

	this.draw = function ({ program, mode = this.gl.TRIANGLES }) {
		if (this.gl.renderer.currentGeometry !== `${this.id}_${program.attributeOrder}`) {
			if (!this.VAOs[program.attributeOrder]) this.createVAO(program);
			this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
			this.gl.renderer.currentGeometry = `${this.id}_${program.attributeOrder}`;
		}

		// Check if any attributes need updating
		program.attributeLocations.forEach((location, { name }) => {
			const attr = attributes[name];
			if (attr.needsUpdate) this.updateAttribute(attr);
		});

		if (this.isInstanced) {
			if (this.attributes.index) {
				this.gl.renderer.drawElementsInstanced(
					mode,
					this.drawRange.count,
					attributes.index.type,
					attributes.index.offset + this.drawRange.start * 2,
					this.instancedCount
				);
			} else {
				this.gl.renderer.drawArraysInstanced(mode, this.drawRange.start, this.drawRange.count, this.instancedCount);
			}
		} else {
			if (attributes.index) {
				this.gl.drawElements(mode, this.drawRange.count, attributes.index.type, attributes.index.offset + this.drawRange.start * 2);
			} else {
				this.gl.drawArrays(mode, this.drawRange.start, this.drawRange.count);
			}
		}
	};

	this.getPositionArray = function () {
		// Use position buffer, or min/max if available
		const attr = attributes.position;
		// if (attr.min) return [...attr.min, ...attr.max];
		if (attr.data) return attr.data;
		if (isBoundsWarned) return;
		console.warn('No position buffer data found to compute bounds');
		return (isBoundsWarned = true);
	};

	this.computeBoundingBox = function (array) {
		if (!array) array = this.getPositionArray();

		if (!this.bounds) {
			this.bounds = {
				min: new glw.Vector3(),
				max: new glw.Vector3(),
				center: new glw.Vector3(),
				scale: new glw.Vector3(),
				radius: Infinity,
			};
		}

		const min = this.bounds.min;
		const max = this.bounds.max;
		const center = this.bounds.center;
		const scale = this.bounds.scale;

		min.set(+Infinity);
		max.set(-Infinity);

		// TODO: use offset/stride if exists
		// TODO: check size of position (eg triangle with Vector2)
		for (let i = 0, l = array.length; i < l; i += 3) {
			const x = array[i];
			const y = array[i + 1];
			const z = array[i + 2];

			min.x = Math.min(x, min.x);
			min.y = Math.min(y, min.y);
			min.z = Math.min(z, min.z);

			max.x = Math.max(x, max.x);
			max.y = Math.max(y, max.y);
			max.z = Math.max(z, max.z);
		}

		scale.sub(max, min);
		center.add(min, max).divide(2);
	};

	this.computeBoundingSphere = function (array) {
		if (!array) array = this.getPositionArray();
		if (!this.bounds) this.computeBoundingBox(array);

		let maxRadiusSq = 0;
		for (let i = 0, l = array.length; i < l; i += 3) {
			tempVec3.fromArray(array, i);
			maxRadiusSq = Math.max(maxRadiusSq, this.bounds.center.squaredDistance(tempVec3));
		}

		this.bounds.radius = Math.sqrt(maxRadiusSq);
	};

	this.remove = function () {
		if (this.vao) this.gl.renderer.deleteVertexArray(this.vao);
		for (let key in attributes) {
			this.gl.deleteBuffer(this.attributes[key].buffer);
			delete attributes[key];
		}
	};


	// create the buffers
	for (let key in attributes) {
		this.addAttribute(key, attributes[key]);
	}
	
};

glw.Mesh = function (gl, { geometry, program, mode = gl.TRIANGLES, frustumCulled = true, renderOrder = 0 } = {}) {

	this.parent = null;
	this.visible = true;
	this.matrix = new glw.Matrix4();
	this.worldMatrix = new glw.Matrix4();
	this.matrixAutoUpdate = true;

	this.position = new glw.Vector3();
	this.quaternion = new glw.Quaternion();
	this.scale = new glw.Vector3(1);
	this.rotation = new glw.Euler();
	this.up = new glw.Vector3(0, 1, 0);

	this.rotation.onChange = () => this.quaternion.fromEuler(this.rotation);
	this.quaternion.onChange = () => this.rotation.fromQuaternion(this.quaternion);

    this.updateMatrixWorld = function (force) {
        if (this.matrixAutoUpdate) this.updateMatrix();
        if (this.worldMatrixNeedsUpdate || force) {
            if (this.parent === null) this.worldMatrix.copy(this.matrix);
            else this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix);
            this.worldMatrixNeedsUpdate = false;
            force = true;
        }
    };

    this.updateMatrix = function () {
        this.matrix.compose(this.quaternion, this.position, this.scale);
        this.worldMatrixNeedsUpdate = true;
    };

	this.traverse = function (callback) {
        // Return true in callback to stop traversing children
        if (callback(this)) return;
    };

    this.decompose = function () {
        this.matrix.getTranslation(this.position);
        this.matrix.getRotation(this.quaternion);
        this.matrix.getScaling(this.scale);
        this.rotation.fromQuaternion(this.quaternion);
    };


	if (!gl.canvas) console.error('gl not passed as first argument to Mesh');
	this.gl = gl;
	this.id = glw.MeshesCount++;
	this.geometry = geometry;
	this.program = program;
	this.mode = mode;

	// Used to skip frustum culling
	this.frustumCulled = frustumCulled;

	// Override sorting to force an order
	this.renderOrder = renderOrder;
	this.modelViewMatrix = new glw.Matrix4();
	this.normalMatrix = new glw.Matrix3();
	this.beforeRenderCallbacks = [];
	this.afterRenderCallbacks = [];


	this.onBeforeRender = function (f) {
        this.beforeRenderCallbacks.push(f);
        return this;
    };

    this.onAfterRender = function (f) {
        this.afterRenderCallbacks.push(f);
        return this;
    };

    this.draw = function ({ camera } = {}) {
        this.beforeRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));
        if (camera) {
            // Add empty matrix uniforms to program if unset
            if (!this.program.uniforms.modelMatrix) {
                Object.assign(this.program.uniforms, {
                    modelMatrix: { value: null },
                    viewMatrix: { value: null },
                    modelViewMatrix: { value: null },
                    normalMatrix: { value: null },
                    projectionMatrix: { value: null },
                    cameraPosition: { value: null },
                });
            }

            // Set the matrix uniforms
            this.program.uniforms.projectionMatrix.value = camera.projectionMatrix.toArray();
            this.program.uniforms.cameraPosition.value = camera.worldPosition.toArray();
            this.program.uniforms.viewMatrix.value = camera.viewMatrix.toArray();
            this.modelViewMatrix.multiply(camera.viewMatrix, this.worldMatrix);
            this.normalMatrix.getNormalMatrix(this.modelViewMatrix);
            this.program.uniforms.modelMatrix.value = this.worldMatrix.toArray();
            this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix.toArray();
            this.program.uniforms.normalMatrix.value = this.normalMatrix.toArray();
        }

        // determine if faces need to be flipped - when mesh scaled negatively
        let flipFaces = this.program.cullFace && this.worldMatrix.determinant() < 0;
        this.program.use({ flipFaces });
        this.geometry.draw({ mode: this.mode, program: this.program });
        this.afterRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));
    };

};

glw.Texture = function (gl, { image, target = gl.TEXTURE_2D, type = gl.UNSIGNED_BYTE, format = gl.RGBA, internalFormat = format, wrapS = gl.CLAMP_TO_EDGE, wrapT = gl.CLAMP_TO_EDGE, generateMipmaps = true, minFilter = generateMipmaps ? gl.NEAREST_MIPMAP_LINEAR : gl.LINEAR, magFilter = gl.LINEAR, premultiplyAlpha = false, unpackAlignment = 4, flipY = target == gl.TEXTURE_2D ? true : false, anisotropy = 0, level = 0, width,  height = width } = {}) {
	
	const emptyPixel = new Uint8Array(4);

	function isPowerOf2(value) {
		return (value & (value - 1)) === 0;
	}

	this.gl = gl;
  	this.id = glw.TexturesCount++;

  	this.image = image;
  	this.target = target;
  	this.type = type;
  	this.format = format;
  	this.internalFormat = internalFormat;
 	this.minFilter = minFilter;
  	this.magFilter = magFilter;
  	this.wrapS = wrapS;
  	this.wrapT = wrapT;
  	this.generateMipmaps = generateMipmaps;
  	this.premultiplyAlpha = premultiplyAlpha;
 	this.unpackAlignment = unpackAlignment;
  	this.flipY = flipY;
 	this.anisotropy = Math.min(anisotropy, this.gl.renderer.parameters.maxAnisotropy);
  	this.level = level;
  	this.width = width;
 	this.height = height;
  	this.texture = this.gl.createTexture();

 	this.store = {
     	image: null,
  	};

  	// Alias for state store to avoid redundant calls for global state
  	this.glState = this.gl.renderer.state;

  	// State store to avoid redundant calls for per-texture state
  	this.state = {};
  	this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR;
  	this.state.magFilter = this.gl.LINEAR;
  	this.state.wrapS = this.gl.REPEAT;
  	this.state.wrapT = this.gl.REPEAT;
 	this.state.anisotropy = 0;
    

	this.bind = function () {
   		// Already bound to active texture unit
        if (this.glState.textureUnits[this.glState.activeTextureUnit] === this.id) return;
        this.gl.bindTexture(this.target, this.texture);
        this.glState.textureUnits[this.glState.activeTextureUnit] = this.id;
    };

    this.update = function (textureUnit = 0) {
        const needsUpdate = !(this.image === this.store.image && !this.needsUpdate);

        // Make sure that texture is bound to its texture unit
        if (needsUpdate || this.glState.textureUnits[textureUnit] !== this.id) {
            // set active texture unit to perform texture functions
            this.gl.renderer.activeTexture(textureUnit);
            this.bind();
        }

        if (!needsUpdate) return;
        this.needsUpdate = false;

        if (this.flipY !== this.glState.flipY) {
            this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
            this.glState.flipY = this.flipY;
        }

        if (this.premultiplyAlpha !== this.glState.premultiplyAlpha) {
            this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
            this.glState.premultiplyAlpha = this.premultiplyAlpha;
        }

        if (this.unpackAlignment !== this.glState.unpackAlignment) {
            this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this.unpackAlignment);
            this.glState.unpackAlignment = this.unpackAlignment;
        }

        if (this.minFilter !== this.state.minFilter) {
            this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
            this.state.minFilter = this.minFilter;
        }

        if (this.magFilter !== this.state.magFilter) {
            this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.magFilter);
            this.state.magFilter = this.magFilter;
        }

        if (this.wrapS !== this.state.wrapS) {
            this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.wrapS);
            this.state.wrapS = this.wrapS;
        }

        if (this.wrapT !== this.state.wrapT) {
            this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.wrapT);
            this.state.wrapT = this.wrapT;
        }

        if (this.anisotropy && this.anisotropy !== this.state.anisotropy) {
            this.gl.texParameterf(
                this.target,
                this.gl.renderer.getExtension('EXT_texture_filter_anisotropic').TEXTURE_MAX_ANISOTROPY_EXT,
                this.anisotropy
            );
            this.state.anisotropy = this.anisotropy;
        }

        if (this.image) {
            if (this.image.width) {
                this.width = this.image.width;
                this.height = this.image.height;
            }

            if (this.target === this.gl.TEXTURE_CUBE_MAP) {
                // For cube maps
                for (let i = 0; i < 6; i++) {
                    this.gl.texImage2D(
                        this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                        this.level,
                        this.internalFormat,
                        this.format,
                        this.type,
                        this.image[i]
                    );
                }
            } else if (ArrayBuffer.isView(this.image)) {
                // Data texture
                this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, this.image);
            } else if (this.image.isCompressedTexture) {
                // Compressed texture
                for (let level = 0; level < this.image.length; level++) {
                    this.gl.compressedTexImage2D(
                        this.target,
                        level,
                        this.internalFormat,
                        this.image[level].width,
                        this.image[level].height,
                        0,
                        this.image[level].data
                    );
                }
            } else {
                // Regular texture
                this.gl.texImage2D(this.target, this.level, this.internalFormat, this.format, this.type, this.image);
            }

            if (this.generateMipmaps) {
                // For WebGL1, if not a power of 2, turn off mips, set wrapping to clamp to edge and minFilter to linear
                if (!this.gl.renderer.isWebgl2 && (!isPowerOf2(this.image.width) || !isPowerOf2(this.image.height))) {
                    this.generateMipmaps = false;
                    this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE;
                    this.minFilter = this.gl.LINEAR;
                } else {
                    this.gl.generateMipmap(this.target);
                }
            }

            // Callback for when data is pushed to GPU
            this.onUpdate && this.onUpdate();
        } else {
            if (this.target === this.gl.TEXTURE_CUBE_MAP) {
                // Upload empty pixel for each side while no image to avoid errors while image or video loading
                for (let i = 0; i < 6; i++) {
                    this.gl.texImage2D(
                        this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                        0,
                        this.gl.RGBA,
                        1,
                        1,
                        0,
                        this.gl.RGBA,
                        this.gl.UNSIGNED_BYTE,
                        emptyPixel
                    );
                }
            } else if (this.width) {
                // image intentionally left null for RenderTarget
                this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, null);
            } else {
                // Upload empty pixel if no image to avoid errors while image or video loading
                this.gl.texImage2D(this.target, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, emptyPixel);
            }
        }
        this.store.image = this.image;
    };

};

glw.RenderTarget = function (gl, { width = gl.canvas.width, height = gl.canvas.height, target = gl.FRAMEBUFFER, color = 1, depth = true, stencil = false, depthTexture = false, wrapS = gl.CLAMP_TO_EDGE, wrapT = gl.CLAMP_TO_EDGE, minFilter = gl.LINEAR, magFilter = minFilter, type = gl.UNSIGNED_BYTE, format = gl.RGBA, internalFormat = format, unpackAlignment, premultiplyAlpha } = {}) {

	this.gl = gl;
	this.width = width;
	this.height = height;
	this.depth = depth;
	this.buffer = this.gl.createFramebuffer();
	this.target = target;
	this.gl.bindFramebuffer(this.target, this.buffer);

	this.textures = [];
	const drawBuffers = [];

	// create and attach required num of color textures
	for (let i = 0; i < color; i++) {
		this.textures.push(
			new glw.Texture(gl, {
				width,
				height,
				wrapS,
				wrapT,
				minFilter,
				magFilter,
				type,
				format,
				internalFormat,
				unpackAlignment,
				premultiplyAlpha,
				flipY: false,
				generateMipmaps: false,
			})
		);
		this.textures[i].update();
		this.gl.framebufferTexture2D(this.target, this.gl.COLOR_ATTACHMENT0 + i, this.gl.TEXTURE_2D, this.textures[i].texture, 0 /* level */);
		drawBuffers.push(this.gl.COLOR_ATTACHMENT0 + i);
	}

	// For multi-render targets shader access
	if (drawBuffers.length > 1) this.gl.renderer.drawBuffers(drawBuffers);

	// alias for majority of use cases
	this.texture = this.textures[0];

	// note depth textures break stencil - so can't use together
	if (depthTexture && (this.gl.renderer.isWebgl2 || this.gl.renderer.getExtension('WEBGL_depth_texture'))) {
		this.depthTexture = new glw.Texture(gl, {
			width,
			height,
			minFilter: this.gl.NEAREST,
			magFilter: this.gl.NEAREST,
			format: this.gl.DEPTH_COMPONENT,
			internalFormat: gl.renderer.isWebgl2 ? this.gl.DEPTH_COMPONENT16 : this.gl.DEPTH_COMPONENT,
			type: this.gl.UNSIGNED_INT,
		});
		this.depthTexture.update();
		this.gl.framebufferTexture2D(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0 /* level */);
	} else {
		// Render buffers
		if (depth && !stencil) {
			this.depthBuffer = this.gl.createRenderbuffer();
			this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
			this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);
			this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthBuffer);
		}

		if (stencil && !depth) {
			this.stencilBuffer = this.gl.createRenderbuffer();
			this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.stencilBuffer);
			this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.STENCIL_INDEX8, width, height);
			this.gl.framebufferRenderbuffer(this.target, this.gl.STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.stencilBuffer);
		}

		if (depth && stencil) {
			this.depthStencilBuffer = this.gl.createRenderbuffer();
			this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthStencilBuffer);
			this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_STENCIL, width, height);
			this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.depthStencilBuffer);
		}
	}

	this.gl.bindFramebuffer(this.target, null);

};
//#endregion


//#region Extras
glw.Plane = function (gl, { width = 1, height = 1, widthSegments = 1, heightSegments = 1, attributes = {} } = {}) {

	const wSegs = widthSegments;
	const hSegs = heightSegments;

	// Determine length of arrays
	const num = (wSegs + 1) * (hSegs + 1);
	const numIndices = wSegs * hSegs * 6;

	// Generate empty arrays once
	const position = new Float32Array(num * 3);
	const normal = new Float32Array(num * 3);
	const uv = new Float32Array(num * 2);
	const index = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);


	buildPlane = function(position, normal, uv, index, width, height, depth, wSegs, hSegs, u = 0, v = 1, w = 2, uDir = 1, vDir = -1, i = 0, ii = 0) {
        const io = i;
        const segW = width / wSegs;
        const segH = height / hSegs;

        for (let iy = 0; iy <= hSegs; iy++) {
            let y = iy * segH - height / 2;
            for (let ix = 0; ix <= wSegs; ix++, i++) {
                let x = ix * segW - width / 2;

                position[i * 3 + u] = x * uDir;
                position[i * 3 + v] = y * vDir;
                position[i * 3 + w] = depth / 2;

                normal[i * 3 + u] = 0;
                normal[i * 3 + v] = 0;
                normal[i * 3 + w] = depth >= 0 ? 1 : -1;

                uv[i * 2] = ix / wSegs;
                uv[i * 2 + 1] = 1 - iy / hSegs;

                if (iy === hSegs || ix === wSegs) continue;
                let a = io + ix + iy * (wSegs + 1);
                let b = io + ix + (iy + 1) * (wSegs + 1);
                let c = io + ix + (iy + 1) * (wSegs + 1) + 1;
                let d = io + ix + iy * (wSegs + 1) + 1;

                index[ii * 6] = a;
                index[ii * 6 + 1] = b;
                index[ii * 6 + 2] = d;
                index[ii * 6 + 3] = b;
                index[ii * 6 + 4] = c;
                index[ii * 6 + 5] = d;
                ii++;
            }
        }
	};
	

	buildPlane(position, normal, uv, index, width, height, 0, wSegs, hSegs);

	Object.assign(attributes, {
		position: { size: 3, data: position },
		normal: { size: 3, data: normal },
		uv: { size: 2, data: uv },
		index: { data: index },
	});

	return new glw.Geometry(gl, attributes);
};

glw.Box = function (gl, { width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1, attributes = {} } = {}) {

	const wSegs = widthSegments;
	const hSegs = heightSegments;
	const dSegs = depthSegments;

	const num = (wSegs + 1) * (hSegs + 1) * 2 + (wSegs + 1) * (dSegs + 1) * 2 + (hSegs + 1) * (dSegs + 1) * 2;
	const numIndices = (wSegs * hSegs * 2 + wSegs * dSegs * 2 + hSegs * dSegs * 2) * 6;

	const position = new Float32Array(num * 3);
	const normal = new Float32Array(num * 3);
	const uv = new Float32Array(num * 2);
	const index = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);

	let i = 0;
	let ii = 0;


	buildPlane = function(position, normal, uv, index, width, height, depth, wSegs, hSegs, u = 0, v = 1, w = 2, uDir = 1, vDir = -1, i = 0, ii = 0) {
        const io = i;
        const segW = width / wSegs;
        const segH = height / hSegs;

        for (let iy = 0; iy <= hSegs; iy++) {
            let y = iy * segH - height / 2;
            for (let ix = 0; ix <= wSegs; ix++, i++) {
                let x = ix * segW - width / 2;

                position[i * 3 + u] = x * uDir;
                position[i * 3 + v] = y * vDir;
                position[i * 3 + w] = depth / 2;

                normal[i * 3 + u] = 0;
                normal[i * 3 + v] = 0;
                normal[i * 3 + w] = depth >= 0 ? 1 : -1;

                uv[i * 2] = ix / wSegs;
                uv[i * 2 + 1] = 1 - iy / hSegs;

                if (iy === hSegs || ix === wSegs) continue;
                let a = io + ix + iy * (wSegs + 1);
                let b = io + ix + (iy + 1) * (wSegs + 1);
                let c = io + ix + (iy + 1) * (wSegs + 1) + 1;
                let d = io + ix + iy * (wSegs + 1) + 1;

                index[ii * 6] = a;
                index[ii * 6 + 1] = b;
                index[ii * 6 + 2] = d;
                index[ii * 6 + 3] = b;
                index[ii * 6 + 4] = c;
                index[ii * 6 + 5] = d;
                ii++;
            }
        }
	};


	// left, right
	buildPlane(position, normal, uv, index, depth, height, width, dSegs, hSegs, 2, 1, 0, -1, -1, i, ii);
	buildPlane(
		position,
		normal,
		uv,
		index,
		depth,
		height,
		-width,
		dSegs,
		hSegs,
		2,
		1,
		0,
		1,
		-1,
		(i += (dSegs + 1) * (hSegs + 1)),
		(ii += dSegs * hSegs)
	);

	// top, bottom
	buildPlane(
		position,
		normal,
		uv,
		index,
		width,
		depth,
		height,
		dSegs,
		hSegs,
		0,
		2,
		1,
		1,
		1,
		(i += (dSegs + 1) * (hSegs + 1)),
		(ii += dSegs * hSegs)
	);
	buildPlane(
		position,
		normal,
		uv,
		index,
		width,
		depth,
		-height,
		dSegs,
		hSegs,
		0,
		2,
		1,
		1,
		-1,
		(i += (wSegs + 1) * (dSegs + 1)),
		(ii += wSegs * dSegs)
	);

	// front, back
	buildPlane(
		position,
		normal,
		uv,
		index,
		width,
		height,
		-depth,
		wSegs,
		hSegs,
		0,
		1,
		2,
		-1,
		-1,
		(i += (wSegs + 1) * (dSegs + 1)),
		(ii += wSegs * dSegs)
	);
	buildPlane(
		position,
		normal,
		uv,
		index,
		width,
		height,
		depth,
		wSegs,
		hSegs,
		0,
		1,
		2,
		1,
		-1,
		(i += (wSegs + 1) * (hSegs + 1)),
		(ii += wSegs * hSegs)
	);

	Object.assign(attributes, {
		position: { size: 3, data: position },
		normal: { size: 3, data: normal },
		uv: { size: 2, data: uv },
		index: { data: index },
	});

	return new glw.Geometry(gl, attributes);
};

glw.Sphere = function (gl, { radius = 0.5, widthSegments = 16, heightSegments = Math.ceil(widthSegments * 0.5), phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI, attributes = {} } = {}) {

	const wSegs = widthSegments;
	const hSegs = heightSegments;
	const pStart = phiStart;
	const pLength = phiLength;
	const tStart = thetaStart;
	const tLength = thetaLength;

	const num = (wSegs + 1) * (hSegs + 1);
	const numIndices = wSegs * hSegs * 6;

	const position = new Float32Array(num * 3);
	const normal = new Float32Array(num * 3);
	const uv = new Float32Array(num * 2);
	const index = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);

	let i = 0;
	let iv = 0;
	let ii = 0;
	let te = tStart + tLength;
	const grid = [];

	let n = new glw.Vector3();

	for (let iy = 0; iy <= hSegs; iy++) {
		let vRow = [];
		let v = iy / hSegs;
		for (let ix = 0; ix <= wSegs; ix++, i++) {
			let u = ix / wSegs;
			let x = -radius * Math.cos(pStart + u * pLength) * Math.sin(tStart + v * tLength);
			let y = radius * Math.cos(tStart + v * tLength);
			let z = radius * Math.sin(pStart + u * pLength) * Math.sin(tStart + v * tLength);

			position[i * 3] = x;
			position[i * 3 + 1] = y;
			position[i * 3 + 2] = z;

			n.set(x, y, z).normalize();
			normal[i * 3] = n.x;
			normal[i * 3 + 1] = n.y;
			normal[i * 3 + 2] = n.z;

			uv[i * 2] = u;
			uv[i * 2 + 1] = 1 - v;

			vRow.push(iv++);
		}

		grid.push(vRow);
	}

	for (let iy = 0; iy < hSegs; iy++) {
		for (let ix = 0; ix < wSegs; ix++) {
			let a = grid[iy][ix + 1];
			let b = grid[iy][ix];
			let c = grid[iy + 1][ix];
			let d = grid[iy + 1][ix + 1];

			if (iy !== 0 || tStart > 0) {
				index[ii * 3] = a;
				index[ii * 3 + 1] = b;
				index[ii * 3 + 2] = d;
				ii++;
			}
			if (iy !== hSegs - 1 || te < Math.PI) {
				index[ii * 3] = b;
				index[ii * 3 + 1] = c;
				index[ii * 3 + 2] = d;
				ii++;
			}
		}
	}

	Object.assign(attributes, {
		position: { size: 3, data: position },
		normal: { size: 3, data: normal },
		uv: { size: 2, data: uv },
		index: { data: index },
	});

	return new glw.Geometry(gl, attributes);
};

glw.Triangle = function (gl, { attributes = {} } = {}) {

	Object.assign(attributes, {
		position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
		uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
	});

	return new glw.Geometry(gl, attributes);
};

glw.Post = function (gl, { width, height, dpr, wrapS = gl.CLAMP_TO_EDGE, wrapT = gl.CLAMP_TO_EDGE, minFilter = gl.LINEAR, magFilter = gl.LINEAR, geometry = new glw.Triangle(gl), targetOnly = null } = {}) {

	this.gl = gl;

	this.options = { wrapS, wrapT, minFilter, magFilter };

	this.passes = [];

	this.geometry = geometry;

	this.uniform = { value: null };
	this.targetOnly = targetOnly;


	const defaultVertex = /* glsl */ `
		attribute vec2 uv;
		attribute vec2 position;

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = vec4(position, 0, 1);
		}
	`;

	const defaultFragment = /* glsl */ `
		precision highp float;

		uniform sampler2D tMap;
		varying vec2 vUv;

		void main() {
			gl_FragColor = texture2D(tMap, vUv);
		}
	`;


	const fbo = (this.fbo = {
		read: null,
		write: null,
		swap: () => {
			let temp = fbo.read;
			fbo.read = fbo.write;
			fbo.write = temp;
		},
	});


	this.addPass = function ({ vertex = defaultVertex, fragment = defaultFragment, uniforms = {}, textureUniform = 'tMap', enabled = true } = {}) {
        uniforms[textureUniform] = { value: this.fbo.read.texture };

        const program = new glw.Program(this.gl, { vertex, fragment, uniforms });
        const mesh = new glw.Mesh(this.gl, { geometry: this.geometry, program });

        const pass = {
            mesh,
            program,
            uniforms,
            enabled,
            textureUniform,
        };

        this.passes.push(pass);
        return pass;
    }

    this.resize = function ({ width, height, dpr } = {}) {
        if (dpr) this.dpr = dpr;
        if (width) {
            this.width = width;
            this.height = height || width;
        }

        dpr = this.dpr || this.gl.renderer.dpr;
        width = (this.width || this.gl.renderer.width) * dpr;
        height = (this.height || this.gl.renderer.height) * dpr;

        this.options.width = width;
        this.options.height = height;

        this.fbo.read = new glw.RenderTarget(this.gl, this.options);
        this.fbo.write = new glw.RenderTarget(this.gl, this.options);
    }

    // Uses same arguments as renderer.render
    this.render = function ({ scene, camera, target = null, update = true, sort = true, frustumCull = true }) {
        const enabledPasses = this.passes.filter((pass) => pass.enabled);

        this.gl.renderer.render({
            scene,
            camera,
            target: enabledPasses.length || (!target && this.targetOnly) ? this.fbo.write : target,
            update,
            sort,
            frustumCull,
        });
        this.fbo.swap();

        enabledPasses.forEach((pass, i) => {
            pass.mesh.program.uniforms[pass.textureUniform].value = this.fbo.read.texture;
            this.gl.renderer.render({
                scene: pass.mesh,
                target: i === enabledPasses.length - 1 && (target || !this.targetOnly) ? target : this.fbo.write,
                clear: true,
            });
            this.fbo.swap();
        });

        this.uniform.value = this.fbo.read.texture;
	}


	this.resize({ width, height, dpr });
	
};

glw.Stats = function () {

	var mode = 0;

	var container = document.createElement( 'div' );
	container.style.cssText = 'position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000';
	container.addEventListener( 'click', function ( event ) {

		event.preventDefault();
		showPanel( ++ mode % container.children.length );

	}, false );

	//

	function addPanel( panel ) {

		container.appendChild( panel.dom );
		return panel;

	}

	function showPanel( id ) {

		for ( var i = 0; i < container.children.length; i ++ ) {

			container.children[ i ].style.display = i === id ? 'block' : 'none';

		}

		mode = id;

	}

	//

	var beginTime = ( performance || Date ).now(), prevTime = beginTime, frames = 0;

	var fpsPanel = addPanel( new glw.Stats.Panel( 'FPS', '#0ff', '#002' ) );
	var msPanel = addPanel( new glw.Stats.Panel( 'MS', '#0f0', '#020' ) );

	if ( self.performance && self.performance.memory ) {

		var memPanel = addPanel( new glw.Stats.Panel( 'MB', '#f08', '#201' ) );

	}

	showPanel( 0 );

	return {
		dom: container,

		addPanel: addPanel,
		showPanel: showPanel,

		begin: function () {

			beginTime = ( performance || Date ).now();

		},

		end: function () {

			frames ++;

			var time = ( performance || Date ).now();

			msPanel.update( time - beginTime, 200 );

			if ( time >= prevTime + 1000 ) {

				fpsPanel.update( ( frames * 1000 ) / ( time - prevTime ), 100 );

				prevTime = time;
				frames = 0;

				if ( memPanel ) {

					var memory = performance.memory;
					memPanel.update( memory.usedJSHeapSize / 1048576, memory.jsHeapSizeLimit / 1048576 );

				}

			}

			return time;

		},

		update: function () {

			beginTime = this.end();

		},

		// Backwards Compatibility

		domElement: container,
		setMode: showPanel

	};
	
};
glw.Stats.Panel = function (name, fg, bg) {
	var min = Infinity, max = 0, round = Math.round;
	var PR = round( window.devicePixelRatio || 1 );

	var WIDTH = 80 * PR, HEIGHT = 48 * PR,
			TEXT_X = 3 * PR, TEXT_Y = 2 * PR,
			GRAPH_X = 3 * PR, GRAPH_Y = 15 * PR,
			GRAPH_WIDTH = 74 * PR, GRAPH_HEIGHT = 30 * PR;

	var canvas = document.createElement( 'canvas' );
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	canvas.style.cssText = 'width:80px;height:48px';

	var context = canvas.getContext( '2d' );
	context.font = 'bold ' + ( 9 * PR ) + 'px Helvetica,Arial,sans-serif';
	context.textBaseline = 'top';

	context.fillStyle = bg;
	context.fillRect( 0, 0, WIDTH, HEIGHT );

	context.fillStyle = fg;
	context.fillText( name, TEXT_X, TEXT_Y );
	context.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

	context.fillStyle = bg;
	context.globalAlpha = 0.9;
	context.fillRect( GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT );

	return {

		dom: canvas,

		update: function ( value, maxValue ) {

			min = Math.min( min, value );
			max = Math.max( max, value );

			context.fillStyle = bg;
			context.globalAlpha = 1;
			context.fillRect( 0, 0, WIDTH, GRAPH_Y );
			context.fillStyle = fg;
			context.fillText( round( value ) + ' ' + name + ' (' + round( min ) + '-' + round( max ) + ')', TEXT_X, TEXT_Y );

			context.drawImage( canvas, GRAPH_X + PR, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT, GRAPH_X, GRAPH_Y, GRAPH_WIDTH - PR, GRAPH_HEIGHT );

			context.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, GRAPH_HEIGHT );

			context.fillStyle = bg;
			context.globalAlpha = 0.9;
			context.fillRect( GRAPH_X + GRAPH_WIDTH - PR, GRAPH_Y, PR, round( ( 1 - ( value / maxValue ) ) * GRAPH_HEIGHT ) );

		}

	};
};
//#endregion