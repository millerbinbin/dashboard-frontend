<template>
  <v-card color="secondary" flat>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-menu offset-y>
            <v-btn dark slot="activator">Dropdown</v-btn>
            <v-list>
              <v-list-tile v-for="item in items" :key="item.text" @click="">
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        e1: null,
        e2: null,
        e3: null,
        e4: null,
        items: [
          { text: 'State 1' },
          { text: 'State 2' },
          { text: 'State 3' }
        ]
      }
    }
  }
</script>