package com.pinyougou.service;

import com.pinyougou.pojo.TbSeller;
import com.pinyougou.sellergoods.service.SellerService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.pinyougou.pojo.TbSeller.SHOP_AUDITED;

/**
 * 认证用户名名密码类
 *
 * @author 晓电脑
 */
public class UserDetailsServiceImpl implements UserDetailsService {


    private SellerService sellerService;


    public void setSellerService(SellerService sellerService) {
        this.sellerService = sellerService;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));

        TbSeller tbSeller = sellerService.findOne(username);

        if (null != tbSeller && Objects.equals(tbSeller.getStatus(), SHOP_AUDITED)) {
            return new User(username, tbSeller.getPassword(), grantedAuthorities);
        }
        return null;
    }
}
