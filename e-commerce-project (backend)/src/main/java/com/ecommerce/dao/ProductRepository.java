package com.ecommerce.dao;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.ecommerce.entities.Product;


@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
	
	
/*select * from product where category_id=? */
	Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);

/*search product by keyword*/
	Page<Product> findByNameContaining (@RequestParam("name") String name , Pageable pageable); 
}
