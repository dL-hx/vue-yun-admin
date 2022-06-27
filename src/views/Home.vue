<template>
<div>
  <el-container>
    <el-header style="line-height: 60px;">Header</el-header>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px">
        <el-menu router>
          <el-submenu index="1" v-for="(item, index) in this.$router.options.routes"
                      :key="index"
                       v-show="!item.hidden"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item :index="$children.path" v-for="(children, index) in item.children">{{ children.name }}</el-menu-item>


          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default {
  name: "Home",
  methods:{
    // menuClick(index){
    //   this.$router.push(index)
    // }
  }
}
</script>

<style scoped>

</style>
