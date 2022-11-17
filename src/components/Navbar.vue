<template>
  <nav>
    <div class="nav-left">
      <img
        src="@/assets/images/logo/logo_darkbg_horizontal.png"
        alt="nav-logo"
        class="nav-logo"
      />
    </div>
    <div class="nav-center">
      <!-- 進度 -->
    </div>
    <div class="nav-right">
      <button
        class="nav-info"
        @mouseenter="helpHover = true"
        @mouseleave="helpHover = false"
      >
        <img
          v-show="!helpHover"
          src="../assets/images/icon/ic_help.svg"
          alt="help"
        />
        <img
          v-show="helpHover"
          src="../assets/images/icon/ic_help_h.svg"
          alt="help-hover"
        />
      </button>
      <button
        class="nav-user"
        @mouseenter="userHover = true"
        @mouseleave="userHover = false"
      >
        <img
          v-show="!userHover"
          src="../assets/images/icon/ic_user.svg"
          alt="user"
        />
        <img
          v-show="userHover"
          src="../assets/images/icon/ic_user_h.svg"
          alt="user-hover"
        />
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      helpHover: false,
      userHover: false,
    }
  },
}
</script>

<style lang="scss" scoped>
nav {
  background: #000;
  padding: 15px 20px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .nav {
    &-right {
      display: flex;
      align-items: center;
    }
    &-logo {
      width: 228px;
      height: 45px;
    }
  }
}

@media screen and (max-width: 385px) {
  nav {
    padding: 8px 12px;
    height: 46px;
    .nav {
      &-logo {
        width: 131px;
        height: 26px;
      }
      &-info {
        img {
          width: 26px;
          height: 26px;
        }
      }
      &-user {
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
