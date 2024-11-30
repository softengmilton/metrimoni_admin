<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="bx-menu" />
        </IconBtn>

        <VSpacer />

        <IconBtn class="me-2">
          <VIcon icon="bx-bell" />
        </IconBtn>

        <!-- 👉 Theme switcher -->
        <NavbarThemeSwitcher class="me-2" />
        <!-- 👉 Theme switcher -->

        <UserProfile />
      </div>
    </template>

    <template #vertical-nav-content>
      <VerticalNavLink
        :item="{
          title: 'Dashboard',
          icon: 'bx-home',
          to: '/dashboard',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Account Settings',
          icon: 'mdi-account-cog-outline',
          to: '/account-settings',
        }"
      />
        
      <VerticalNavSectionTitle
        :item="{
          heading: 'Customers',
        }"
      />
        <VerticalNavLink
        :item="{
          title: 'All Customer',
          icon: 'bx-cart',
          to: '/all-customer',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Bride',
          icon: 'bx-cart-add',
          to: '/bride',
        }"
      />

      <VerticalNavLink
        :item="{
          title: 'Groom',
          icon: 'bx-window-close',
          to: '/groom',
        }"
      />
        
      <VerticalNavSectionTitle
        :item="{
          heading: 'Payments',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'New Payments',
          icon: 'bx-credit-card-front',
          to: '/payments',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'All Payments',
          icon: 'bx-credit-card',
          to: '/payments',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Failed Payments',
          icon: 'bx-credit-card-front',
          to: '/payments',
        }"
      />
        
      
      <VerticalNavSectionTitle
        :item="{
          heading: 'Information',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Reviews',
          icon: 'bx-cloud-upload',
          to: '/shop',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Contacts',
          icon: 'bx-store',
          to: '/shop',
        }"
      />

      <!-- 👉 Pages -->
      <!-- <VerticalNavSectionTitle
        :item="{
          heading: 'Access Control',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Roles',
          icon: 'bx-universal-access',
          to: '/acl/roles',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Permissions',
          icon: 'bx-shield-quarter',
          to: '/acl/permissions',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Users',
          icon: 'bx-user-pin',
          to: '/acl/users',
        }"
      /> -->
        
      <VerticalNavSectionTitle
        :item="{
          heading: 'Settings',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'General',
          icon: 'bx-cog',
          to: '/settings',
        }"
      />
      <!-- <VerticalNavLink
        :item="{
          title: 'Email Settings',
          icon: 'bx-envelope',
          to: '/settings',
        }"
      />
      <VerticalNavLink
        :item="{
          title: 'Payment Settings',
          icon: 'bx-credit-card',
          to: '/settings',
        }"
      /> -->
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
</script>

<style lang="scss" scoped>
.meta-key {
    border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
    border-radius: 6px;
    block-size: 1.5625rem;
    line-height: 1.3125rem;
    padding-block: 0.125rem;
    padding-inline: 0.25rem;
}
</style>
