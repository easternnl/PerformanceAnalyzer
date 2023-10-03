<template>
  <p>
    Input: '{{ inputforgzip }}'
  </p>
  <p>
Output: '{{ outputgzipped }}'
  </p>

  <p>
    Input: '{{ inputforgunzip }}'
  </p>
  <p>
    Output: '{{ outputgunzip }}'
  </p>
</template>

<script>
export default {
  name: "GZipExample",
  data: function() {
    return {
      inputforgzip: 'Text to gzip',
      inputforgunzip: 'H4sIAKPG5GQA/y3KsQ2AIBiE0d4pbhhH4Qs5RSTwR4zT09i/3SEPXT6qgjeUjHxquiSUP7dG3X51P3Rn6lAnUxQTFmdTBuZBAAAA'
    }
  },
  computed: {
    outputgzipped: function() {
      const buf = this.$fflate.strToU8(this.inputforgzip);

      const compressed = this.$fflate.gzipSync(buf,{ level: 9 })
      const compressedstring =this.$fflate.strFromU8(compressed, true)

      const base64string = btoa(compressedstring)

      return base64string
    },
    outputgunzip: function() {

      const decompressed =  this.$fflate.decompressSync(
          this.$fflate.strToU8(atob(this.inputforgunzip), true)
      );
      const origText = this.$fflate.strFromU8(decompressed);
      return origText
    }
  }
}
</script>

<style scoped>

</style>