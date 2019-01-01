<template>
  <header class="header">
    <span class="logo logo-site"/>
    <span class="title">CCrame</span>
    <!-- <span class="logo logo-github"/> -->
  </header>
</template>

<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Pacifico);
  @import '@/styles/variables.scss';

  .header {
    height: $headerHeight;
    line-height: $headerHeight;
    background: $headerBackgroundColor;
    font-size: $headerFontSize;

    text-align: left;
    width: 100%;
    box-shadow: 1px 1px 5px rgba(0,0,0,.5);
    padding: 0 20px;
  }

  .logo {
    height: $headerLogoHeight;
    width: $headerLogoHeight;
    background-size: $headerLogoHeight $headerLogoHeight;
    margin: calc((#{$headerHeight} - #{$headerLogoHeight}) / 2) 0;

    display: inline-block;
  }
  .logo-site {
    background-image: url($headerSiteLogo);
  }
  .logo-github {
    background-image: url($headerGithubLogo);
  }

  .title {
    vertical-align: top;
    font-family: Pacifico;
  }
</style>
