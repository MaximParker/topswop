<script>
</script>

<main>
      <section class="basic-grid">
          <div class="card">1</div>
          <div class="card">2</div>
          <div class="card">3</div>
          <div class="card">4</div>
          <div class="card">5</div>
          <div class="card">6</div>
      </section>


    
</main>

<style>

.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #353535;
    font-size: 3rem;
    color: #fff;
    box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    transition: all 500ms;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    /* margin-left: 5px; */
    /* margin-right: 5px; */

 }
  
.card:hover {
    box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em, rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
    transform: translateY(-3px) scale(1.1);
 }

 .basic-grid {
     display: grid;
     gap: 0.5rem; 
     padding: 5px;
     grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
     justify-content: center;
     
     

 }

 @media screen and (max-width: 350px) {
   .basic-grid {
      grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
   }
}

</style>

