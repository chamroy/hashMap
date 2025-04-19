class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initialCapacity).fill(null).map(() => []);
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.size = 0;
  }


  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    
    for (let i = 0; i < key.length; i++) {

      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
 
    for (const entry of bucket) {
      if (entry.key === key) {
        entry.value = value; 
        return;
      }
    }
    
   
    bucket.push({ key, value });
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }


  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (const entry of bucket) {
      if (entry.key === key) {
        return entry.value;
      }
    }
    
    return null;
  }


  has(key) {
    return this.get(key) !== null;
  }


  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    
    return false;
  }


  length() {
    return this.size;
  }


  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }


  keys() {
    const keysArray = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        keysArray.push(entry.key);
      }
    }
    return keysArray;
  }

  values() {
    const valuesArray = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        valuesArray.push(entry.value);
      }
    }
    return valuesArray;
  }


  entries() {
    const entriesArray = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entriesArray.push([entry.key, entry.value]);
      }
    }
    return entriesArray;
  }


  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
    
   
    for (const bucket of oldBuckets) {
      for (const entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }
  }
}

const map = new HashMap();

map.set('cool','nl');
map.set('place', 'Manipur')
map.set('age', 34)


console.log(map.get('age'));
console.log(map.get('place'));

console.log(map.has('cool'));
console.log(map.has('okay'));

console.log(map.remove('age'));
console.log(map.get('age'));
console.log(map.keys());
console.log(map.values());
console.log(map.entries());
console.log(map.length());


console.log(map.clear());
console.log(map.length());









