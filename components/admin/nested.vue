<template>
  <v-list dense>
    <template v-for='node in nodes'>
      <v-list-group v-if='node.children && node.children.length' v-model='node.active' :prepend-icon='node.icon' color='dark'>
        <v-list-item :to='node.to' router exact slot='activator'>
          <v-list-item-title>{{node.title}}</v-list-item-title>
        </v-list-item>
        <node-list class='py-0 pl-2' :nodes='node.children'/>
      </v-list-group>
      <v-list-item :to='node.to' router exact v-else>
          <v-list-item-action>
            <v-icon v-text='node.icon'></v-icon>
          </v-list-item-action>
          <v-list-item-title>{{node.title}}</v-list-item-title>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'node-list',
  props: ['nodes'],
}
</script>
